import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
});

export default mongoose.model("User", UserSchema);
