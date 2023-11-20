const express = require('express')
const mongoose = require('mongoose')
const taskRouter = require('./router/TaskRoutes')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use((req,res,next)=>{
    console.log(req.path)
    console.log(req.method)
    next()
})
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Data Base is  connected successfully")
        console.log(`PORT is running at ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err.message)
})

app.use('/api/tasks',taskRouter)
