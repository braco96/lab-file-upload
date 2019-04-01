// models/User.model.js

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: true
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."]
    },
    // Campos adicionales para almacenar la imagen de perfil del usuario
    profilePicPath: {
      type: String,
      default: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
    },
    profilePicName: String
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
