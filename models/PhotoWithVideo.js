import mongoose from "mongoose";
const PhotoWithVideoSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum:["évenement","formation"],
      required: true,
    },
    description: {
      type: String,
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    image: {
      type: String,
      validate: {
        validator: function (v) {
          return this.video || v; // Ensures that either image or video is present
        },
        message: "Either an image or a video is required.",
      },
    },
    video: {
      type: String,
      validate: {
        validator: function (v) {
          return this.image || v; // Ensures that either video or image is present
        },
        message: "Either a video or an image is required.",
      },
    },
  },
);

export default mongoose.model("PhotoWithVideo", PhotoWithVideoSchema);
