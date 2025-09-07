const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  first_name: { type: String},
  last_name: { type: String},
  email: { type: String, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String },
  address: { type: String },
  status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
  role: { type: String, enum: ['admin','user'], default: 'user' }, 
  dob: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  image: { type: String },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("User", userSchema, "users");
