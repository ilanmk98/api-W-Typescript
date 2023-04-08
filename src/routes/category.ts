import express from 'express'
import {
    Category
} from '../model/categoryModel'

import * as bodyParser from 'body-parser'
import {
    toggleInProducts
} from '../productServices'


const router = express.Router()
router.use(bodyParser.urlencoded({
    extended: true
}))


router.route("/")

    .get((_req, res) => {
        Category.find({})
            .then((foundItems => {
                res.send(foundItems)
            }))
            .catch((e) => {
                console.log(e);

            })
    })

    .post((req, res) => {


            const category = new Category({
                title: req.body.title,
                enable: req.body.enable
            })


            category.save()
                .then(() => {
                    res.send(req.body)
                })
                .catch((e) => {
                    res.send(e.message)


                })
        }


    )

    .delete((req, res) => {
        Category.findByIdAndRemove(req.body.id)
            .then((result) => {
                if (result === null) {
                    throw new Error("Category not found")
                } else {
                    res.send(result)
                }

            })
            .catch((e: any) => {
                res.send(e.message)
            })
    })

    .put((req, res) => {
    
        Category.findOneAndReplace({
                title: req.body.title
            }, {title: req.body.newTitle,
                enable: req.body.enable})
            .then((result) => {
                res.send(result)
            })
            .catch((e) => {
                res.send(e.message)
            })

    })



router.patch("/toggleEnabled", (req, res) => {
    Category.findOne({
            title: req.body.title,
        },'enable')
        .then((result) => {
            if (result != null) {
                const currentStatus = Boolean(result.enable)

                Category.updateOne({
                        title: req.body.title
                    }, {
                        enable: !currentStatus
                    })
                    .then(() => {
                        res.send("enable updated successfully")
                    })
                    .catch((e) => {
                        res.send(e.message)
                    })

                toggleInProducts(req.body.title, currentStatus)
            } else {
                res.send("There is no such category")
            }
        })
})

export default router