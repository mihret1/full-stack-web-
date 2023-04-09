import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoute from './src/routes/posrRoute.js'
import userRoute from './src/routes/userRoute.js'

import dotenv from 'dotenv'



// const MONGO_URL="mongodb://localhost/reduxFullStack"

const app=express()
dotenv.config()

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

const PORT=process.env.PORT || 2000

app.use('/posts',postRoute)
app.use('/users',userRoute)


mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>{
    console.log(`backend is running on port ${PORT} and database is connected`)
}))
.catch((error)=>console.log(error.message))




// mongoose.set('useFindAndModify',false)

// app.listen(PORT,()=>{
//     console.log(`backend is running on port ${PORT}`)
// })