import express from 'express'
import Product from '../model/productModel'
import {Category} from '../model/categoryModel'
import * as bodyParser from 'body-parser'



const router = express.Router()
router.use(bodyParser.urlencoded({
    extended: true
}))
router.route("/")


.get((_req,res)=>{
    Product.find({"category.enable": true})
    .then((foundItems)=>{
        res.send(foundItems)
    })
    .catch((e)=>{
        res.send(e.message)
    })
    
})

.post((req,res)=>{

    let isCate = new Category()
    Category.findOne({title:req.body.catTitle})
    .then((foundItems => {
        if(foundItems===null)
        {
            throw new Error ("There is no such category")
        }
        else
        {
                isCate.title=foundItems.title,
                isCate.enable=foundItems.enable
                const product = new Product ({
                    price:req.body.price,
                    title:req.body.title,
                    enable:req.body.enable,
                    category:isCate
                    })
                        product.save()
                        .then(()=>{
                            res.send(req.body)
                        })
                        .catch((e)=>{
                            res.send(e.message)
                        })
            
            
        }
    }))
    .catch((e) => {
        res.send(e.message)

    })
    
})

.patch((req,res)=>{
    
    Product.findOneAndUpdate({title:req.body.title},{title:req.body.newTitle,price:req.body.price})
    .then((result)=>{
        res.send(result)
    })
    .catch((e)=>{
        res.send(e.message)
    })
    
 })

router.patch("/toggleEnabled",(req,res)=>{
Product.findOne({title:req.body.title},'enable')
.then((result)=>{
    if(result!=null)
    {
       const currentStatus = Boolean(result.enable)
       Product.findOneAndUpdate({title:req.body.title},{enable:!currentStatus})
       .then(()=>{
        res.send("Enable updated successfully")
       })
       .catch((e)=>{
        res.send(e.message)
       })
       

    }
})
})




export default router