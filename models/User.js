import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema({
    customer_id:{
      type:String,
      unique: true,
      required:true,
    },
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  firstName: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  country:{
    type: String,
    required: [true, 'Please provide country'],
    minlength: 3,
    maxlength: 50,
  },
  city:{
    type: String,
    required: [true, 'Please provide city'],
    minlength: 3,
    maxlength: 50,
  },
  levelOfStudy:{
    type: String,
    required: [true, 'Please provide  level of study'],
    minlength: 3,
    maxlength: 50,
  },
  specialty:{
    type: String,
    required: [true, 'Please provide specialty'],
    minlength: 3,
    maxlength: 50,
  },
  occupation:{
    type: String,
    required: [true, 'Please provide occupation'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  secondPassword: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
   numberPhone:{
    type:Number,
    required: [true, 'Please provide number phone'],
    maxlength:10,
  },
  image:{
    type:String,
  },
  image1:{
    type:String,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
  UserSchema.virtual('orders', {
    ref: 'Order',
    localField: 'customer_id',
    foreignField: 'customer_id',
    justOne: false,
  });

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
export default mongoose.model("User", UserSchema);
