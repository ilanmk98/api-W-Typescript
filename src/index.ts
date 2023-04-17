import express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import categoryRouter from './routes/category'
import productRouter from './routes/product'


const app = express()
const PORT = 3000

app.use('/api/category',categoryRouter)
app.use('/api/product',productRouter)

app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.connect("mongodb://0.0.0.0:27017/testingDB")

app.get('/', (_req, res) => {
    console.log("ping");
    res.send("pong")

})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);

})