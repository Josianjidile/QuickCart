import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Object,
      default: {},
    },
  },
  { minimize: false, timestamps: true } // ✅ Corrected placement of timestamps
);

const User = mongoose.models.User || mongoose.model("User", userSchema); // ✅ Prevent model overwrite

export default User;
