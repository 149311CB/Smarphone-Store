import asyncHandler from "express-async-handler";
import Spec from "../models/specModel.js";

// @descs   Fetch all products specs
// @route   GET /api/specs
// @access  Public
const getSpecs = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? {$regex: `${req.query.keyword}`, $options: 'i'} : /.*/
  const minprice = req.query.minprice ? parseInt(req.query.minprice) : 0;
  const maxprice = req.query.maxprice ? parseInt(req.query.maxprice) : Number.MAX_SAFE_INTEGER;
  const minrom = req.query.minrom ? parseInt(req.query.minrom) : 0;
  const maxrom = req.query.maxrom ? parseInt(req.query.maxrom) : Number.MAX_SAFE_INTEGER;
  const minram = req.query.minram ? parseInt(req.query.minram) : 0;
  const maxram = req.query.maxram ? parseInt(req.query.maxram) : Number.MAX_SAFE_INTEGER;
  const manufactor = req.query.manufactor ? `${req.query.manufactor}` : /.*/;

  /* name: {
    $regex: req.query.keyword,
    $options: 'i'
  } */
  const query = {
    name: keyword,
    price: {$gte: minprice, $lte: maxprice},
    rom: {$gte: minrom, $lte: maxrom},
    ram: {$gte: minram, $lte: maxram},
    manufactor: manufactor
  }

  let sorting = {}
  switch (req.query.sorting) {
    case 'createAt':
      sorting = {createAt: 'desc'}
      break;
    case 'highprice':
      sorting = {price: 'desc'}
      break;
    case 'lowprice':
      sorting = {price: 'asc'}
      break;
    default:
      sorting = {}
      break;
  }

  const specs = await Spec.find(query)
    .limit(parseInt(req.query.limit))
    .skip((parseInt(req.query.page) - 1) * parseInt(req.query.limit))
    .sort(sorting)
  const count = await Spec.countDocuments(query)

  const result = {}
  result.specs = specs
  result.total = count
  result.sorting = sorting
  if (req.query.page < count) {
    result.next = parseInt(req.query.page) + 1
  }
  if (req.query.page > 0) {
    result.prev = parseInt(req.query.page) - 1
  }
  res.json(result);
});

// @descs   Fuzzy searching || not sure it can be call like that
// @route   GET /api/specs/fuzzy
// @access  Public
const fuzzySearch = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const products = await Spec.find({...keyword}).limit(parseInt(req.query.limit)).select("name images price")

  res.json(products)
})

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
    .select("name price images ")
  res.json(spec._doc)
})

// @descs   Fetch products specs by id
// @route   GET /api/specs/:id
// @access  Public
const getSpecById = asyncHandler(async (req, res) => {
  const spec = await Spec.findById(req.params.id)
    .populate("warranty")
    .populate({path: "reviews", populate: {path: "user", select: "firstName lastName"}})
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
  const createAt = new Date().toISOString()

  await Spec.create({...req.body, createAt})
  res.status(201).json({message: "Product created"});
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

const createReviews = asyncHandler(async (req, res) => {
  const spec = await Spec.findById(req.params.id)
  if (spec) {
    const alreadyReview = spec.reviews.find(r => r.user.toString() === req.user._id.toString())
    if (alreadyReview) {
      res.status(400)
      throw new Error("Product already reviewed")
    }
    const review = {...req.body, user: req.user._id}
    spec.reviews.push(review)
    await spec.save()
    res.status(200).json({message: "Review added"})
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
  res.json(spec)
})

const updateProduct = asyncHandler(async (req, res) => {
  const spec = await Spec.findById(req.params.id)
  if (spec) {
    spec.name = req.body.name
    spec.model = req.body.model
    spec.manufactor = req.body.manufactor
    spec.make = req.body.make
    spec.backCam = req.body.backCam
    spec.frontCam = req.body.frontCam
    spec.display = req.body.display
    spec.resolution = req.body.resolution
    spec.size = req.body.size
    spec.chipset = req.body.chipset
    spec.gpu = req.body.gpu
    spec.charger = req.body.charger
    spec.battery = req.body.battery
    spec.simNumber = req.body.simNumber
    spec.rom = req.body.rom
    spec.ram = req.body.ram
    spec.warranty = req.body.warranty
    spec.price = req.body.price
    spec.images = req.body.images
    spec.countInStock = req.body.countInStock
    await spec.save()
    res.status(200).json({message: "Product updated"})
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export {
  getSpecs,
  getSpecById,
  createProduct,
  deleteProductById,
  getSpecsForCart,
  getSimilarProduct,
  createReviews,
  updateProduct,
  fuzzySearch
};
