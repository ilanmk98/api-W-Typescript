import mongoose from 'mongoose';
import {CategorySchema, iCategory} from './categoryModel';

interface iProduct{
    price:number,
    title:string,
    enable:boolean,
    category:iCategory
}

const ProductSchema = new mongoose.Schema<iProduct>(
{
    price:{type:Number,required:true},
    title:{type:String,required:true},
    enable:{type:Boolean,required:true},
    category:{type:CategorySchema,required:true}
})

const Product = mongoose.model<iProduct>('Product',ProductSchema)

export default Product