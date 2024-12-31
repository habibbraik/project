import * as dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import  nodemailer from  "nodemailer";
  import Order from './models/Order.js';
  import { StatusCodes } from 'http-status-codes';
  import cookieParser from "cookie-parser";
  import { NotFoundError } from "./errors/customErrors.js";
  import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import { authenticateUser, authorizePermissions } from './middleware/authentication.js';
import userRouter from './routes/userRoutes.js';
import videoRouter from './routes/videoRouter.js';
import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import fileUpload from 'express-fileupload';
import cors from 'cors'
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { ChargilyClient,verifySignature } from '@chargily/chargily-pay';
import Course from "./models/Course.js";



const app=express()
// import bodyParser from 'body-parser';




dotenv.config();
 // Cr
const __dirname = dirname(fileURLToPath(import.meta.url));

  // app.set('trust proxy', 1);
  // app.use(
  //   rateLimiter({
  //     windowMs: 15 * 60 * 1000,
  //     max: 60,
  //   })
  // );
  // app.use(helmet());
  // app.use(xss());
  // app.use(mongoSanitize());
app.use(cors())
app.use(
  bodyParser.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const API_SECRET_KEY='test_sk_fOlehda4FykjllG7U1paokv9wgl1OwUzYbFfFyjn'
const client = new ChargilyClient({
  api_key: API_SECRET_KEY,
  mode: 'test', // Change to 'live' when deploying your application
});

async function main(){
  // authenticateUser
   app.post('/chargily/webhook',async(req, res) => {
     const signature = req.get('signature') || '';
     const payload = req .rawBody;

     if (!signature) {
       console.log('Signature header is missing');
       return res.sendStatus(400);

     }
    //  console.log('Authenticated user ID:', req.user ? req.user.userId : 'No user'); // Log user ID or absence

     try {
       if (!verifySignature(payload, signature, API_SECRET_KEY)) {
         console.log('Signature is invalid');
         return res.sendStatus(403);

       }
     } catch (error) {
       console.log(
         'Something happened while trying to process the request to the webhook'
       );
       return res.sendStatus(403);
      }

     const event = req.body;
    //  const userId = event.data.userId;
    //  console.log('Authenticated user ID:', req.user.userId,event);
     // You can use the event.type here to implement your own logic

     const getLatestMonth = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // Months are zero-based, so add 1
      return { year, month };
    };
     console.log(event)
     if(event.type === 'checkout.paid'){

      try{
        const { year, month } = getLatestMonth();
        const formation=await Course.findOne({_id:event.data.metadata.orderId})
        if (!formation) {
          throw new  NotFoundError(
            `No formation with id : ${formation}`
          );
        }
        const order = await Order.create({checkoutId:event.data.id,  year,customer_id:event.data.customer_id,formation_id:event.data.metadata.orderId, // Optional: store the year
          month,amount:event.data.amount,name:event.data.description});

         res
           .status(StatusCodes.CREATED)
           .json({ order,month, year});
       }catch(error){
        console.log(error)

       }
      }
     return res.status(200).end()
   });

}
main()

function sendEmail({ email,  message, subject,phoneNumber,
  fullName}) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "habibbraik78@gmail.com",
        pass: "liwb ofke fnzn uyom",
      },
    });

    const mail_configs = {
      from:email,
      to:"habibbraik78@gmail.com",
      subject: subject,
      html: `
      <p>email send by:</p>
      <p>${email}</p>
      <p>${phoneNumber}<p>
      <p>${fullName}<p>
      <p>${message}</p>
      `,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}
app.get("/sendEmail", (req, res) => {
  sendEmail(req.query)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
app.use(express.static(path.resolve(__dirname, "./public")));
// USE V2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure:true,
});
app.use(express.json());
const fileUploadMiddleware = fileUpload({ useTempFiles: true });
app.use(cookieParser(process.env.JWT_SECRET));







app.post('/api/v1/checkout', async (req, res) => {

  try {

      let {amount,metadata,customer_id,description}=req.body
      // const customer_id=req.body.customer_id
      // const metadata=req.body.metadata
      if (!amount  || !metadata || !customer_id || !description) {
        return res.status(400).json({ error: 'مفقود amount أو customer_id' });
      }


      const checkout = await client.createCheckout({
        success_url: `${process.env.ORIGIN_URL}/success`,
        failure_url: `${process.env.ORIGIN_URL}/failure`,
        amount,
        description,
        customer_id:String(customer_id),
        metadata: { orderId:String(metadata) },
        currency: 'dzd', // تأكد من أن العملة صحيحة
      });

      res.status(200).json({ checkout});
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/v1/customer',async(req,res)=>{
  // console.log(req.body)
try{
  const customer=await client.createCustomer({...req.body})
  if(customer){
    console.log(`this ${customer}`)
  }
  res.status(200).json({ customer});
}catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
}
})


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/courses",fileUploadMiddleware, courseRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter)
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

app.use('/api/v1/orders',authenticateUser,authorizePermissions('admin'),async (_req,res)=>{
  const { startOfPeriod, endOfPeriod } = getLastSixMonthsDateRange();
  const { year, month } = getLatestMonth();
  const ordersLastSixMonths = await Order.find({
    createdAt: { $gte: startOfPeriod, $lte: endOfPeriod }
  });
  const OrdersLastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const monthDate = new Date(startOfPeriod);
    monthDate.setMonth(startOfPeriod.getMonth() + i);
    const month = monthDate.getMonth() + 1; // الأشهر تبدأ من 0
    const year = monthDate.getFullYear();
    const count = ordersLastSixMonths
      .filter(order => order.createdAt.getMonth() + 1 === month && order.createdAt.getFullYear() === year)
      .length;
    return { month, year, count };
  });
  // const orderss = await Order.count({
  //   createdAt: { $gte: startOfPeriod, $lte: endOfPeriod }
  // });

   const orders=await Order.find({
    createdAt: { $gte: startOfPeriod, $lte: endOfPeriod }
   })
   const orderss=await Order.countDocuments({
    createdAt: { $gte: startOfPeriod, $lte: endOfPeriod }
   })
   const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
   const annualOrders=await Order.find({
    year: year,
   })
   const monthlyEarnings = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const totalAmounts = annualOrders
      .filter(order => order.month === month)
      .reduce((sum, order) => sum + order.amount, 0);
    return { month, totalAmounts };
  });
  const totalAmountOfSixMonths = Array.from({ length: 6 }, (_, i) => {
    const monthDate = new Date(startOfPeriod);
    monthDate.setMonth(startOfPeriod.getMonth() + i);
    const month = monthDate.getMonth() + 1; // Months are zero-based
    const year = monthDate.getFullYear();

    // Calculate total amount for the current month
    const totalAmount = ordersLastSixMonths
      .filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() + 1 === month && orderDate.getFullYear() === year;
      })
      .reduce((sum, order) => sum + order.amount, 0);

    return { month, year, totalAmount };
  });
  const totalOrderCountLastSixMonths = ordersLastSixMonths.length;
  const sumTotalAmountOfSixMonths = totalAmountOfSixMonths.reduce((sum, monthData) => sum + monthData.totalAmount, 0);
  res.status(StatusCodes.OK).json({orderss,totalOrderCountLastSixMonths,sumTotalAmountOfSixMonths,orders,totalAmount,monthlyEarnings,OrdersLastSixMonths,totalAmountOfSixMonths});

});
app.use(express.static(path.resolve(__dirname, 'my-react-app/dist')));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'my-react-app/dist','index.html'))
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});


  // app.use(express.static(path.join(__dirname, "./my-react-app/dist")));





const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
