import { readFile } from 'fs/promises'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import User from './models/User.js';
import Course from './models/Course.js';
// import Order from './models/Order.js';


try{
 await mongoose.connect(process.env.MONGO_URL);
 const user=await User.findOne({email:'habibbraik88@gmail.com'})
 const jsonCourses= JSON.parse(await readFile(new URL('./utils/MOCK_DATA.json',import.meta.url)))

 const courses=jsonCourses.map((course)=>{
    return{...course};
 })

//  await Order.deleteMany({})
 await Course.create(courses)
 console.log('Success!!!')
 process.exit(0)
}catch(error){
console.log(error)
process.exit(1)
}