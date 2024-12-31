import mongoose from 'mongoose';


const OrderSchema = new mongoose.Schema(
  {
    // shippingFee: {
    //   type: Number,
    //   required: true,
    // },
    // discount: {
    //   type: Number,
    //   required: true,
    //   default: -300,
    // },
    // total: {
    //   type: Number,
    //   required: true,
    // },
    // totalAmount:{
    //   type: Number,
    //   required: true,
    // },
    // orderItems: [SingleOrderItemSchema],
    // status: {
    //   type: String,
    //   enum: ['Processing', 'Cancelled', 'Completed'],
    //   default: 'Processing',
    // },
    // address: {
    //   type: String,
    //   required: true,
    // },
    // wilaya: {
    //   type: String,
    //   required: true,
    // },
    // city: {
    //   type: String,
    //   required: true,
    // },
    // paymentMethod: {
    //   type: String,
    //   required: true,
    // },
    // phoneNumber: {
    //   type: String,
    //   required: true,
    // },
    // house:{
    //   type:String
    // },
    // codePostal: {
    //   type: String,
    //   required: true,
    // },
    // firstName: {
    //   type: String,
    //   required: true,
    // },
    // lastName: {
    //   type: String,
    //   required: true,
    // },
    // clientSecret: {
    //   type: String,
    //   required: true,
    // },
    // paymentIntentId: {
    //   type: String,
    // },
    name:{
      type:String,
      required:true
    },
    formation_id:{
      type:String,
      required:true
    },
    checkoutId:{
      type:String,
      required:true
    },
    year: {
      type: Number,
      required: true
    },
    amount:{
      type:Number,
      required:true
    },
    month: {
      type: Number,
      required: true
    },
    customer_id: {
      type: String,
      required: true,
      ref: 'User', // Reference to User model
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

OrderSchema.virtual('user', {
  ref: 'User',
  localField: 'customer_id',
  foreignField: 'customer_id',
  justOne: true,
});

export default mongoose.model('Order', OrderSchema);
