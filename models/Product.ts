import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
  
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);