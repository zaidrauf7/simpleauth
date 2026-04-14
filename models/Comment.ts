import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: String,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
}, { timestamps: true });

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);