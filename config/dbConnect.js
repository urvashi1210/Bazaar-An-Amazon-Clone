const {default:mongoose}=require('mongoose');

const dbConnect=()=>{
   try{
     const conn=mongoose.connect(`mongodb://localhost:27017/Bazaar`);
    console.log("Database connected successfully")
    }catch(err){
        console.log("Database error");
}
};

module.exports=dbConnect;