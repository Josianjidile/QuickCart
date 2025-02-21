import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,  
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: String,  
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String, 
      ref: "Address",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'order placed',
    },
    date: {
      type: Number,  
      required: true,
    },
  },
  { minimize: false, timestamps: true } // ✅ Corrected placement of timestamps
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema); // ✅ Prevent model overwrite

export default Order;
