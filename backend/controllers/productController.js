import asyncHandler from "express-async-handler";
import Spec from "../models/specModel.js";

// @descs   Fetch all products specs
// @route   GET /api/specs
// @access  Public
const getSpecs = asyncHandler(async (req, res) => {
  const specs = await Spec.find({});
  res.json(specs);
});

// @descs   Fetch products specs by id
// @route   GET /api/specs/:id
// @access  Public
const getSpecById = asyncHandler(async (req, res) => {
  const spec = await Spec.findById(req.params.id);
  res.json(spec);
});

export { getSpecs, getSpecById };
