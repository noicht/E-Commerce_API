import { Schema, model } from "mongoose";
import { IClient } from "../interfaces";

const ClientSchema = new Schema<IClient>({
    name: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    cuit: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    debt: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true, versionKey: false });


ClientSchema.pre('findOneAndUpdate', function (next) {
    const update: any = this.getUpdate();

    // Obtener el documento actualizado
    const doc: any = this.model.findOne(this.getQuery());

    if (doc && update.$inc && update.$inc.debt) {
        // Aplicar el incremento/decremento a 'debt'
        const currentDebt = doc.debt;
        const increment = update.$inc.debt;
        doc.debt = parseFloat((currentDebt + increment).toFixed(2));
    }

    next();
});

const Client = model<IClient>("clients", ClientSchema);

export { Client, ClientSchema };