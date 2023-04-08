import * as mongoose from 'mongoose'



 interface iCategory{
    title:{type:String},
    enable:{type:boolean}
}

const CategorySchema = new mongoose.Schema<iCategory>(
{
   title:{type:String, required:true},
   enable:{type:Boolean,required:true}

})

const Category = mongoose.model<iCategory>('Category',CategorySchema)

export {Category}
export {CategorySchema}
export {iCategory}

