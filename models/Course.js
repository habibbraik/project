import mongoose from "mongoose";
const scheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi","Jeudi","Vendredi"],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});
const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide course name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    level: {
      type: String,
      trim: true,
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      default: 0,
    },
    costs: {
      type: Number,
      required: [true, "Please provide costs price"],
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    ended: {
      type: Boolean,
      default:false,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    image:{
      type:String,
    },
    schedule: [scheduleSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", CourseSchema);
