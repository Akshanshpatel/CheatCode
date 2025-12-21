const express=require('express')
const app=express();
require('dotenv').config();

require('./models/dbConnect')

const PORT=process.env.PORT || 8080;

const authRouter=require('./routes/authRouter')

app.get('/',(req,res)=>{
    res.send("Hello my nigga")
})

app.use('/auth',authRouter)

app.listen(PORT,()=>{
    console.log(`sever running at ${PORT}`)
})