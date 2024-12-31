import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Order from "../models/Order.js"
export const getApplicationStats = async(req,res)=>{
    const users=await User.countDocuments();
    // const jobs=await JobModel.countDocuments();
    // res.status(StatusCodes.OK).json({users,jobs})
    res.status(StatusCodes.OK).json({users})
}
const getLatestMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Months are zero-based, so add 1
  return { year, month };
};
const getLastSixMonthsDateRange = () => {
  const now = new Date();
  const endOfPeriod = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Start of the next month
  const startOfPeriod = new Date(now.getFullYear(), now.getMonth() - 5, 1); // Six months ago, start of the month
  return { startOfPeriod, endOfPeriod };
};

export const getAllUsers = async (_req, res) => {
  const { startOfPeriod, endOfPeriod } = getLastSixMonthsDateRange();
  const { year, month } = getLatestMonth();
  const users = await User.find({
    role:"user",
  }).select("-password").populate('orders');
  const userss = await User.count({
    role:"user",
    createdAt: { $gte: startOfPeriod, $lte: endOfPeriod }
  }).select("-password");

    const usersLastSixMonths = await User.find({
      role:"user",
      createdAt: { $gte: startOfPeriod, $lte: endOfPeriod }
    }).select("-password");
    const UsersLastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const monthDate = new Date(startOfPeriod);
      monthDate.setMonth(startOfPeriod.getMonth() + i);
      const month = monthDate.getMonth() + 1; // Months are zero-based, so add 1
      const year = monthDate.getFullYear();
      const count = usersLastSixMonths
        .filter(user => user.createdAt.getMonth() + 1 === month && user.createdAt.getFullYear() === year)
        .length;
      return { month, year, count };
    });
    res.status(StatusCodes.OK).json({ users,userss,UsersLastSixMonths});
  };
export  const showCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId }).populate('orders');;
    res.status(StatusCodes.OK).json({ user })
  };
export const getCurrentUserOrders = async (req, res) => {
  // 01j6sm2v9g7vzcga2enwcmrzbz

    const orders = await Order.find({ customer_id: req.user.customer_id }).populate('user');
    res.status(StatusCodes.OK).json({ orders, count: orders.length })
  };
// export const updateUser = async(req,res)=>{
//     const newUser={...req.body}
//     delete newUser.password;

//     if(req.file){
//         const response=await cloudinary.v2.uploader.upload(req.file.path)
//         await fs.unlink(req.file.path)
//         newUser.avatar=response.secure_url
//         newUser.avatarPublicId=response.public_id
//     }
//     const updatedUser=await User.findByIdAndUpdate(req.user.userId,newUser)
//     if(req.file && updatedUser.avatarPublicId){
//         await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
//     }
//     res.status(StatusCodes.OK).json({msg:'get update user',user:updatedUser})

// }
export const deleteUserFromAdmin = async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
  }
  res.status(StatusCodes.OK).json({ msg: "User deleted successfully" });
};