import asyncHandler from "express-async-handler";
import Spec from "../models/specModel.js";

// @descs   Fetch all products specs
// @route   GET /api/specs
// @access  Public
const getSpecs = asyncHandler(async (req, res) => {
  const minprice = req.query.minprice ? parseInt(req.query.minprice) : 0;
  const maxprice = req.query.maxprice ? parseInt(req.query.maxprice) : Number.MAX_SAFE_INTEGER;
  const minrom = req.query.minrom ? parseInt(req.query.minrom) : 0;
  const maxrom = req.query.maxrom ? parseInt(req.query.maxrom) : Number.MAX_SAFE_INTEGER;
  const minram = req.query.minram ? parseInt(req.query.minram) : 0;
  const maxram = req.query.maxram ? parseInt(req.query.maxram) : Number.MAX_SAFE_INTEGER;
  const manufactor = req.query.manufactor ? `${req.query.manufactor}` : /.*/;

  const specs = await Spec.find({
    price: {$gte: minprice, $lte: maxprice},
    rom: {$gte: minrom, $lte: maxrom},
    ram: {$gte: minram, $lte: maxram},
    manufactor: manufactor
  })
    .select("name price images reviews")

  res.json(specs);
});

const getSimilarProduct = asyncHandler(async (req, res) => {
  const specs = await Spec.find({
    manufactor: req.query.manufactor
  })
    .select("name price images reviews")
  res.json(specs)
})

// @descs   Fetch all products specs
// @route   GET /api/specs
// @access  Public
const getSpecsForCart = asyncHandler(async (req, res) => {
  const spec = await Spec.findById(req.params.id)
    .select("name price images coupons")
    .populate({
      path: "coupons",
      select: "name discountType discountAmount discountPercent discountStart activeTime",
      model: "Coupon"
    })
  res.json(spec._doc)
})

// @descs   Fetch products specs by id
// @route   GET /api/specs/:id
// @access  Public
const getSpecById = asyncHandler(async (req, res) => {
  const spec = await Spec.findById(req.params.id)
    .populate("warranty")
    .populate("coupons")
    .populate({path:"reviews",populate:{path:"user", select:"firstName lastName"}})
  res.json(spec);
});

// @descs   Fetch products specs by id
// @route   GET /api/specs/:id
// @access  Public
const createProductRating = asyncHandler(async (req, res) => {

})


// @descs   Create a product
// @route   POST /api/producs
// @access  Public
const createProduct = asyncHandler(async (req, res) => {
  const product = await Spec.create(req.body)
  res.status(201).json(product);
})

// @descs   Delete a product by id
// @route   DELETE /api/producs
// @access  Public
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Spec.findById(req.params.id);
  if (product) {
    await product.remove()
    res.json({message: "Product removed"})
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const createReviews = asyncHandler(async (req, res) =>{
  const spec = await Spec.findById(req.params.id)
if(spec){
  const alreadyReview = spec.reviews.find(r => r.user.toString() === req.user._id.toString())
  if(alreadyReview){
    res.status(400)
    throw new Error("Product already reviewed")
  }
  const review = {...req.body,user:req.user._id}
  spec.reviews.push(review)
  await spec.save()
  res.status(201).json({message:"Review added"})
}else{
  res.status(404)
  throw new Error("Product not found")
}
  res.json(spec)
})

export {
  getSpecs,
  getSpecById,
  createProduct,
  deleteProductById,
  getSpecsForCart,
  getSimilarProduct,
    createReviews
};
