const mongoose=require("mongoose");

exports.validateMongooseId=(id)=>{
    const isValid=mongoose.Types.ObjectId.isValid(id);
    if(!isValid)throw new Error("This id is not valid or not found");
}
