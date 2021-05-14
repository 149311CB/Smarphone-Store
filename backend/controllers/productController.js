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
  const specs = await Spec.find({price: {$gte: minprice, $lte: maxprice}, roms: {$gte: minrom, $lte: maxrom}, rams: {$gte: minram, $lte: maxram}, manufactor: manufactor})
  res.json(specs);
});

// @descs   Fetch products specs by id
// @route   GET /api/specs/:id
// @access  Public
const getSpecById = asyncHandler(async (req, res) => {
  const spec = await Spec.findById(req.params.id);
  res.json(spec);
});

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

export {getSpecs, getSpecById, createProduct, deleteProductById};
