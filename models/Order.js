import mongoose from "mongoose";

//create scheema
const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    adress: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    // status order
    status: {
      type: Number,
      default: 0,
    },
    //this is payment method cash or paypall
    method: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
