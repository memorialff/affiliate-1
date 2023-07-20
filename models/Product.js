// X:\affiliate\my-affiliate-shop\models\Product.js

import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  brand: String,
  category: String,
  subcategory: String,
  title: String,
  affCode: String, 
  price: Number,
  oldPrice: Number,
  campaignName: String,
  imageUrls: String,
  description: String,
});

export default mongoose.model('Product', ProductSchema);
