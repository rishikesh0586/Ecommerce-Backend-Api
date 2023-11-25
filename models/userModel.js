const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [4, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// .pre is mongoose hook which perfom just before  save 
//here it is used to hash password
  userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
    
    next();
   }

   this.password = await bcrypt.hash(this.password, 10);
 });

// JWT TOKEN   getJWT token is custom method to generate JWT token
//jwt.sign() this take 3 argument and generate and return JWT token
//argument 1 is id , argument 2 is secret , argument 3 is expire
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password is custom method use in login

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token ye random number 20 digt generate krke unhe hex string me convert krdega
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
//this line tell agar 15 min me password change na kiya to reset password expire ho jayega
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

   module.exports = mongoose.model("User", userSchema);
