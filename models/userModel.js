// const mongoose = require('mongoose'); // Erase if already required
// const bcrypt=require('bcrypt')

// // Declare the Schema of the Mongo model
// var userSchema = new mongoose.Schema({
//     firstname:{
//         type:String,
//         required:true,
//         index:true,
//     },
//     lastname:{
//         type:String,
//         required:true,
//         index:true,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     mobile:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     role:{
//         type:String,
//         default:"user",
//     },
//     cart:{
//         type:Array,
//         default:[],
//     },
//     address:[{
//         type:ObjectId,
//         ref:"Address"
//     }],
//     wishList:[{
//         type:ObjectId,
//         ref:"Product"
//     }]
// },{
//     timestamps:true,
// });

// userSchema.pre('save',async function(next){
//     const salt=await bcrypt.genSaltSync(10);
//     this.password=await bcrypt.hash(this.password,salt);
// })
// userSchema.methods.isPasswordMatched=async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword,this.password);
// };
// //Export the model
// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const { Schema, Types } = mongoose; // Add this line to import ObjectId
const crypto=require("crypto");
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    index: true,
  },
  lastname: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  isBlocked:{
    type:Boolean,
    default:false,
  },
  cart: {
    type: Array,
    default: [],
  },
  address: [{
    type: Types.ObjectId, // Update the type to Types.ObjectId
    ref: "Address"
  }],
  wishlist: [{
    type: Types.ObjectId, // Update the type to Types.ObjectId
    ref: "Product"
  }]
,refreshToken:{
    type:String,
},
passwordChangedAt:Date,
passwordResetToken:String,
passwordResetExpires:Date,
}
,{
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken=async function(){
  const resettoken=crypto.randomBytes(32).toString('hex');
  this.passwordResetToken=crypto.createHash('sha256').update(resettoken).digest("hex");
  this.passwordResetExpires=Date.now()+30*60*1000;//10 mins
  return resettoken;
}

// Export the model
module.exports = mongoose.model('User', userSchema);



