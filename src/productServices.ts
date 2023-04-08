import Product from "./model/productModel";

export function toggleInProducts (catName:string, currentStatus:boolean)
{
Product.updateMany({"category.title":catName},{"category.enable":!currentStatus})
.then((result)=>{
return "Products updates successfully "+result
})
.catch((e:any)=>{
    return e.message
})
}




export function toggleEnabled()
{

}




    
    
