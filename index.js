const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const dbConnect=require("./config/dbConnect.js");
const authRouter=require('./routes/authRoute')
const PORT=process.env.PORT||5000;

dbConnect();

app.use('/api/user',authRouter);

app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);
});


