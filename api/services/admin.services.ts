import { ordersRepo, clientRepo, productsRepo, paymentRepo } from "../repositories";
import {
    IDashboard,
    IOrders,
    IClient,
    IProduct,
    IOrdersPendigShippin,
    IPayment
} from "../interfaces";

export const getDashboardData = async (): Promise<IDashboard> => {
   
    const topDebtors = await debtorClient();
    const stockProductsData = await lowStockProducts();
    const payments = await getLatest10Charges();
    const ordersPending = await getOldestPendingOrdersForWholesalersAndRetailers();

    return {
        stockProducts: stockProductsData,
        debtorsClients: topDebtors,
        payments: payments,
        ordersPending: ordersPending
    };
}
// ventas minoristas y mayoristas
const getLatest10Charges = async (): Promise<IPayment[]> => {
   const payments = await paymentRepo.find({},{skip: 0, limit: 10 })

    return payments;
}
// mayores deudores
const debtorClient = async (): Promise<IClient[]> => {
    const topDebtorsData: IClient[] = await clientRepo.debtorClient();

    return topDebtorsData;
}
// productos bajos en stock
const lowStockProducts = async (): Promise<IProduct[]> => {
    const lowStockProducts = await productsRepo.lowStock();

    return lowStockProducts;
}
// productos mas vendidos
const getOldestPendingOrdersForWholesalersAndRetailers = async (): Promise<IOrdersPendigShippin> => {
    const wholesalers:IOrders[]=await ordersRepo.find({shipping:'pending delivery',isWholesaler:true});
    const retails:IOrders[]=await ordersRepo.find({shipping:'pending delivery',isWholesaler:false});
    return {wholesalers,retails}
}