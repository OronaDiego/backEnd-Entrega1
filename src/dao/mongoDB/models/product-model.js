import { Schema, model} from 'mongoose';

const productSchema= new Schema({
    title: {type: String, required:true},
    description: { type: String},
    code: {type: Number, required:true},
    price: {type: Number, required: true},
    status: {type: String},
    stock: {type: Number},
    category: {type: String}
})

export const productModel = model('products', productSchema)

