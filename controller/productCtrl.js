const Product=require("../models/productModel")
const User=require("../models/userModel")

const asyncHandler=require("express-async-handler")

//SLUGIFY:
const slugify=require("slugify");
const { updatedUser } = require("./userCtrl");



exports.createProduct=asyncHandler(async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title);
        }
        const newProduct=await Product.create(req.body);
        res.json(newProduct);
    }catch(error){
        throw new Error(error);
    }
});

exports.getaProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        const findProduct=await Product.findById(id);
        res.json(findProduct);
    }catch(error){
        throw new Error(error);
    }
});

exports.getAllProducts = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryObj[el]);
  
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = Product.find(JSON.parse(queryStr));
        
      //Sorting
        if(req.query.sort){
            let sortBy=req.query.sort.split(",").join(" ");
            query=query.sort(sortBy);
        }else{
            query=query.sort('-createdAt');
        }

      //Limiting the fields
        if(req.query.fields){
            const fields=req.query.fields.split(",").join(" ");
            query=query.select(fields);
        }else{
            query=query.select('-__v')
        }

      //Pagination
        const page=req.query.page;
        const limit=req.query.limit;
        const skip=(page-1)*limit;
        query=query.skip(skip).limit(limit);
        
        if(req.query.page){
            const productCount=await Product.countDocuments();
            if(skip>=productCount)throw new Error('This page does not exist');
        }
        
        console.log(page,limit,skip);

         const products = await query;
        res.json(products);
        }catch (error) {
        throw new Error(error);
    }
  });
  

exports.updateProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    // validateMongoDbId(id);
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title);
        }
        const updatedProduct=await Product.findOneAndUpdate({_id:id},req.body,{
            new:true
        });
        res.json(updatedProduct);
    
    }catch(error){
        throw new Error(error);
    }
})

exports.deleteProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    // validateMongoDbId(id);
    try{
        const deletedProduct=await Product.findOneAndDelete({_id:id});
        res.json(deletedProduct);
    }catch(error){
        throw new Error(error);
    }
})


//FILTERING->SORTING->LIMITING->PAGINATION


exports.addToWishlist=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    const {prodId}=req.body;
    try{
        const user=await User.findById(_id);
        const alreadyadded=user.wishlist.find((id)=>id.toString()===prodId);
        if(alreadyadded){
            let user=await User.findByIdAndUpdate(_id,{
                $pull:{wishlist:prodId},
            },{
                new:true,
            });
            res.json(user);
        }else{
            let user=await User.findByIdAndUpdate(_id,{
                $push:{wishlist:prodId},
            },{
                new:true,
            });
            res.json(user);
        }
    }catch(error){
        throw new Error(error);
    }
})

// exports.rating = asyncHandler(async (req, res) => {
//     try {
//       const { _id } = req.user;
//       const { star, prodId } = req.body;
//       const product = await Product.findById(prodId);
//       let alreadyRated = product.ratings.find((userId) => {
//         return userId.postedby.toString() === _id.toString();
//       });
  
//       if (alreadyRated) {
//         const updateRating = await Product.updateOne(
//           { ratings: { $elemMatch: alreadyRated } },
//           {
//             $set: {
//               "ratings.$.star": star
//             }
//           },
//           {
//             new: true
//           }
//         );
//         console.log(res.json)
//         res.json(updateRating);
//       } else {
//         const rateProduct = await Product.findByIdAndUpdate(
//           prodId,
//           {
//             $push: {
//               ratings: {
//                 star: star,
//                 postedby: _id
//               }
//             }
//           },
//           {
//             new: true
//           }
//         );
//         res.json(rateProduct);
//       }
//     } catch (error) {
//       throw new Error(error);
//     }
//   });
  
// //   exports.getallratings = asyncHandler(async(req,res)=>{
// //     await Product.findById(prodId);
// //   let totalRating = getallratings.ratings.length;
// //   let ratingsum = getallratings.ratings
// //     .map((item) => item.star)
// //     .reduce((prev, curr) => prev + curr, 0);
// //   let actualRating = Math.round(ratingsum / totalRating);
// //   let finalproduct = await Product.findByIdAndUpdate(
// //     prodId,
// //     {
// //       totalrating: actualRating,
// //     },
// //     { new: true }
// //   );
// //   res.json(finalproduct);
// // } catch (error) {
// //   throw new Error(error);
// // }
// // });

exports.rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
      const product = await Product.findById(prodId);
      let alreadyRated = product.ratings.find(
        (userId) => userId.postedby.toString() === _id.toString()
      );
      if (alreadyRated) {
        const updateRating = await Product.updateOne(
          {
            ratings: { $elemMatch: alreadyRated },
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          },
          {
            new: true,
          }
        );
      } else {
        const rateProduct = await Product.findByIdAndUpdate(
          prodId,
          {
            $push: {
              ratings: {
                star: star,
                comment: comment,
                postedby: _id,
              },
            },
          },
          {
            new: true,
          }
        );
      }
      const getallratings = await Product.findById(prodId);
      let totalRating = getallratings.ratings.length;
      let ratingsum = getallratings.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);
      let actualRating = Math.round(ratingsum / totalRating);
      let finalproduct = await Product.findByIdAndUpdate(
        prodId,
        {
          totalrating: actualRating,
        },
        { new: true }
      );
      res.json(finalproduct);
    } catch (error) {
      throw new Error(error);
    }
  });