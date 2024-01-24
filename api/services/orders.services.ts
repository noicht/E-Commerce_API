import {
  ordersRepo,
  productsRepo,
  userRepo,
  clientRepo,
  paymentRepo
} from "../repositories";
import {
  IOrders,
  IOrdersParams,
  IOrdersProducts,
  IOrdersUpdate,
  IUser,
  IClient,
  IRetail,
  paginationResponseOrders,
  IPayment,
  IOrdersProductsParams
} from "../interfaces";
import { _FilterQuery, Types, ObjectId } from "mongoose";

export const getOrdersService = async (
  clientId: string | undefined,
  code: string | undefined,
  email: string | undefined,
  isWholesaler: string | undefined,
  status: string | undefined,
  shipping: string | undefined,
  name: string | undefined,
  page: string | number | undefined = 0,
  quantity: string | number | undefined = 0
): Promise<paginationResponseOrders> => {
  let filter: any = {};

  if (clientId) filter["client._id"] = new Types.ObjectId(clientId);
  if (code) filter["code"] = new RegExp(code, "i");
  if (email) filter["client.email"] = new RegExp(email, "i");
  if (isWholesaler) filter["isWholesaler"] = isWholesaler.toLowerCase() === 'true' ? true : false;
  if (status) filter["status"] = status;
  if (shipping) filter["shipping"] = shipping;
  if (name) filter["$or"] = [{ "client.name": new RegExp(name, "i") }, { "client.businessName": new RegExp(name, "i") },
  { "client.surname": new RegExp(name, "i") }];


  const pageFormated = Number(page);
  const cantFormated = Number(quantity);
  const skip = (pageFormated - 1) * cantFormated;

  const total = await ordersRepo.countDocuments(filter);
  const orders: IOrders[] = await ordersRepo.find(filter, {
    skip,
    limit: cantFormated,
  });
  const totalPages = cantFormated !== 0 ? Math.ceil(total / cantFormated) : 1;

  return {
    page: pageFormated !== 0 ? pageFormated : 1,
    quantity: cantFormated !== 0 ? cantFormated : total,
    cantTotal: total,
    totalPages,
    data: orders,
  };
};

export const getOrdersByIdService = async (
  id: Types.ObjectId
): Promise<paginationResponseOrders> => {
  const order: IOrders | null = await ordersRepo.findById(id);
  if (!order) {
    throw new Error("Order no encontrado.");
  }

  return {
    page: 1,
    quantity: 1,
    cantTotal: 1,
    totalPages: 1,
    data: [order],
  }
};

export const getNewOrderCode = async (baseCode: string): Promise<string> => {
  const regex = new RegExp(`^${baseCode}-`, "i");
  const lastOrder = await ordersRepo.findOneOrder(
    { code: { $regex: regex } },
    { sort: { createdAt: -1 } }
  );
  let lastNumber;
  if (!lastOrder || !lastOrder.code) {
    lastNumber = 0;
  } else {
    lastNumber = parseInt(lastOrder.code.split("-")[1]);
  }
  const lastOrderNumber = lastNumber;
  const newOrderNumber = (lastOrderNumber + 1).toString().padStart(4, "0");
  return `${baseCode}-${newOrderNumber}`;
};

export const createOrdersService = async (
  data: IOrdersParams
): Promise<IOrders> => {
  let clientData: IUser | IClient | IRetail | null;
  let isClientWholesaler = false;

  if (typeof data.client === "string") {
    clientData = await userRepo.findById(data.client);
    if (!clientData) {
      clientData = await clientRepo.findById(data.client);
      if (clientData) {
        isClientWholesaler = true; // si clientData existe en clientRepo es un mayorista
      }
    }
    if (!clientData) {
      throw new Error(`No se encuentra el cliente: ${data.client}.`);
    }
    if (clientData.isDeleted) {
      throw new Error(
        `El cliente ${clientData.name} ha sido eliminado y no puede crear ordenes.`
      );
    }
  } else if (data.client && typeof data.client === "object") {
    clientData = data.client as IRetail;
  } else {
    throw new Error("Formato de cliente invalido.");
  }

  let baseCode: string;

  if (clientData && "code" in clientData) {
    baseCode = clientData.code;
  } else {
    baseCode = process.env.DEFAULT_CODE || "GENERIC";
  }

  const orderCode = await getNewOrderCode(baseCode);
  let priceLefTax = 0;
  let newData: any = {
    products: [],
    client: clientData,
    code: orderCode,
    priceLefTax: 0,
    tax: 0,
    finalPrice: 0,
    status: isClientWholesaler == true ? "pending paid" : 'paid',
    partialPayment: 0,
    isWholesaler: isClientWholesaler,
    shipping: "pending delivery"
  };

  await Promise.all(
    data.products.map(async (element: IOrdersProductsParams) => {
      const product = await productsRepo.findById(element.id);
      if (product) {
        if (product?.isDeleted) {
          throw new Error(`El producto ${product.name} no se encuentra disponible.`);
        }
        console.log(product)
        let pricePerUnit;
        let quantityForPrice;

        if (product?.stock < element.quantity) {
          throw new Error(`El producto ${product.name} que desea agregar a la orden no posee stock suficiente.`);
        }

        quantityForPrice = element.quantity;

        if (isClientWholesaler) {
          pricePerUnit = product.bulk.price;
        } else {
          pricePerUnit = product.price;
        }
        newData.products.push({ quantity: element.quantity, product: product, discount: element.discount });
        priceLefTax += element.discount && element.discount > 0 ?
          (quantityForPrice * pricePerUnit) - element.discount :
          quantityForPrice * pricePerUnit;
      } else {
        throw new Error(`El producto ${product} no se encuentra disponible.`);
      }
    })
  );
  newData.priceLefTax = parseFloat(priceLefTax.toFixed(2));
  newData.tax = parseFloat((newData.priceLefTax * 0.21).toFixed(2));
  newData.finalPrice = parseFloat((priceLefTax + newData.tax).toFixed(2));
  let orders: any = await ordersRepo.create(newData);

  if (typeof data.client === 'string') {
    let client = await clientRepo.findById(data.client);
    let roundedFinalPrice = parseFloat(orders.finalPrice.toFixed(2));
    if (client) {
      await clientRepo.modifDebt(orders.client._id, roundedFinalPrice);
      if (Math.sign(client.debt) === -1)
        if (roundedFinalPrice >= client.debt) {
          orders = await ordersRepo.updateById(orders._id, { status: 'partial paid', partialPayment: Math.abs(client.debt) });
        } else {
          orders = await ordersRepo.updateById(orders._id, { status: 'paid', partialPayment: roundedFinalPrice });

        }
    }
  }

  newData.products.forEach(async (element: IOrdersProducts) => {
    await productsRepo.modifStock(element.product._id, - element.quantity);
  });

  return orders;
};

export const updateOrderByIdService = async (
  id: Types.ObjectId,
  orderData: IOrdersParams
): Promise<IOrders> => {
  let newData: IOrdersUpdate = {};
  let priceLefTax = 0;
  let isClientWholesaler = false;

  if (orderData.client !== undefined) {
    // Si es un string (es decir, un ID)
    if (typeof orderData.client === "string") {
      const [userClient, actualClient] = await Promise.all([
        userRepo.findById(orderData.client),
        clientRepo.findById(orderData.client),
      ]);
      if (userClient) {
        if (userClient.isDeleted) {
          throw new Error(
            `El usuario ${userClient.name} ha sido eliminado y no puede crear ordenes.`
          );
        }
        newData["client"] = userClient;
      } else if (actualClient) {
        if (actualClient.isDeleted) {
          throw new Error(
            `El usuario ${actualClient.name} ha sido eliminado y no puede crear ordenes.`
          );
        }
        newData["client"] = actualClient;
      } else {
        throw new Error(`No se encuentra el cliente.`);
      }
    } else if (orderData.client && typeof orderData.client === "object") {
      newData["client"] = orderData.client as IRetail;
    } else {
      throw new Error(`Formato de cliente inválido.`);
    }
  }

  if (orderData.status !== undefined) {
    newData["status"] = orderData.status;
  }
  isClientWholesaler = (newData.client && "cuit" in newData.client) || false;
  if (orderData.products) {
    let updatedProducts: IOrdersProducts[] = [];

    for (let productInfo of orderData.products) {
      const product = await productsRepo.findById(productInfo.id);
      if (product) {
        if (product.isDeleted) {
          throw new Error(`El producto ${product.name} no se encuentra disponible.`);
        }



        if (isClientWholesaler && product.bulk) {
          priceLefTax += productInfo.quantity * product.bulk.price;
        } else {
          if (product.stock < productInfo.quantity) {
            throw new Error(`El producto ${product.name} que desea agregar a la orden no posee stock suficiente.`);
          }
          let productPrice = productInfo.discount && productInfo.discount > 0
            ? productInfo.quantity * product.price - productInfo.discount
            : productInfo.quantity * product.price;
          priceLefTax += productPrice;
        }

        updatedProducts.push({
          quantity: productInfo.quantity,
          discount: productInfo.discount,
          product: product,
        });
      } else {
        throw new Error(`El producto no se encuentra disponible.`);
      }
    }
    newData["isWholesaler"] = isClientWholesaler
    newData["products"] = updatedProducts;
    newData.priceLefTax = parseFloat(priceLefTax.toFixed(2));
    newData["tax"] = parseFloat((priceLefTax * 0.21).toFixed(2));
    newData["finalPrice"] = parseFloat((priceLefTax + newData.tax).toFixed(2))
  }
  const oldData = await ordersRepo.findById(id);

  if (oldData) {
    const updatedOrder: IOrders | null = await ordersRepo.updateById(
      id,
      newData
    );

    if (updatedOrder && orderData.products) {
      await clientRepo.modifDebt(oldData.client._id, -oldData.priceLefTax);

      oldData.products.forEach(async (element: IOrdersProducts) => {
        await productsRepo.modifStock(element.product._id, element.quantity);
      });

      await clientRepo.modifDebt(
        updatedOrder.client._id,
        updatedOrder.priceLefTax
      );

      updatedOrder.products.forEach(async (element: IOrdersProducts) => {
        await productsRepo.modifStock(element.product._id, -element.quantity);
      });

      return updatedOrder;
    } else {
      throw new Error(`La orden no se pudo actualizar 001.`);
    }
  } else {
    throw new Error(`La orden no se pudo actualizar 002.`);
  }
};

export const deleteOrderService = async (id: Types.ObjectId,): Promise<IOrders | null> => {
  const order = await ordersRepo.findById(id);
  if (!order) {
    throw new Error(`No existe la orden ingresada`);
  }
  const updatedOrder: IOrders | null = await ordersRepo.updateById(order._id, { status: 'cancelled' });
  if (updatedOrder) {
    updatedOrder.products.forEach(async (element) => {
      await productsRepo.modifStock(element.product._id, element.quantity)
    })
    await clientRepo.modifDebt(updatedOrder.client._id, -updatedOrder.finalPrice)
  }

  return updatedOrder;
}

// funcion para procesar el pago
export const processPayment = async (paymentData: IPayment, clientData: IClient) => {
  try {
    // info del pago:
    const payment: IPayment | any = await paymentRepo.findById(paymentData._id);
    if (!payment) {
      throw new Error("Payment not found or is null.");
    }

    const clientId = payment.client._id;

    let paymentAmount = payment.total;

    // buscamos ordenes pending paid o partial paid:
    const filter = {
      'client._id': clientId,
      'status': { $in: ['pending paid', 'partial paid'] }
    };

    // ordenes ordenadas de + antigua a + nueva:
    const orders: IOrders[] = await ordersRepo.find(filter, { skip: 0, limit: 0 }, { 'createdAt': 'asc' });

    // ordenes pendientes y aplicamos el pago:
    for (let order of orders) {
      if (paymentAmount <= 0) {
        break;
      }

      const amountDue = order.finalPrice - order.partialPayment;

      let orderChange: any = {};

      if (paymentAmount >= amountDue) {
        orderChange['partialPayment'] = order.finalPrice;
        orderChange['status'] = 'paid';
      } else {
        orderChange['partialPayment'] = order.partialPayment + paymentAmount;
        orderChange['status'] = 'partial paid';
      }

      paymentAmount -= amountDue;

      // updateamos la orden:
      await ordersRepo.updateById(order._id, orderChange);
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};



// funcion para procesar el pago
export const processPaymentDelete = async (paymentData: IPayment, clientData: IClient) => {
  try {
    // info del pago:
    const payment: IPayment | any = await paymentRepo.findById(paymentData._id);
    if (!payment) {
      throw new Error("Payment not found or is null.");
    }

    const clientId = payment.client._id;
    let paymentTotal = payment.total;


    // buscamos ordenes pending paid o partial paid:
    const filter = {
      'client._id': clientId,
      'status': { $in: ['paid', 'partial paid'] }
    };

    // ordenes ordenadas de + antigua a + nueva:
    const orders: IOrders[] = await ordersRepo.find(filter, { skip: 0, limit: 0 }, { 'createdAt': -1 });

    // ordenes pendientes y aplicamos el pago:

    for (let order of orders) {
      if (paymentTotal === 0) {
        break;
      }

      const amountDue = order.partialPayment;

      let orderChange: any = {};
   
      if (paymentTotal >= order.partialPayment) {
        orderChange['partialPayment'] = 0;
        orderChange['status'] = 'pending paid';
        paymentTotal -= amountDue;
      } else {
        orderChange['partialPayment'] = order.partialPayment - paymentTotal;
        orderChange['status'] = 'partial paid';
        paymentTotal = 0;
      }

      // updateamos la orden:
      await ordersRepo.updateById(order._id, orderChange);
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};