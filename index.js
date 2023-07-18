const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const dbConnect=require("./config/dbConnect.js");
const authRouter=require('./routes/authRoute');
const productRouter=require('./routes/productRoute');
const blogRouter=require('./routes/blogRoute');
const categoryRouter=require('./routes/prodcategoryRoute.js');
const bodyParser = require('body-parser');
const { notFound,errorHandler } = require('./middlewares/errorHandler.js');
const PORT=process.env.PORT||5000;
const cookieParser=require("cookie-parser")
const morgan=require("morgan");

dbConnect();
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use('/api/user',authRouter);
app.use('/api/product',productRouter);
app.use("/api/blog",blogRouter);
app.use("/api/category",categoryRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);
});


