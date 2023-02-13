import mongoose from "mongoose";

//create scheema
const ProductSchema = new mongoose.Schema(
  {
    //name of product
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    //description of product
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    //img of product its string bc we will accept url to upload product from firebase
    img: {
      type: String,
      required: true,
    },
    //prices will be array of number bc its on range small,medium or large size
    prices: {
      type: [Number],
      required: true,
    },
    // extra option will be array of object that req text and price
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  //time stamp when we adding product
  { timestamps: true }
);
// if we dont have Product schema yet then we will create
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
