import Course from "../models/Course.js";
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js'
import { v2 as cloudinary } from 'cloudinary';
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import path from "path";
// import { BadRequestError } from "../errors/customErrors.js";
import fs from 'fs';
const createCourse = async (req, res) => {
    req.body.user = req.user.userId;
    if (req.body.schedule) {
      req.body.schedule = JSON.parse(req.body.schedule);
    }
    const course = await Course.create(req.body);
    res.status(StatusCodes.CREATED).json({ course })
  };
const getAllCourses = async (_req, res) => {
    const courses= await Course.find({}).sort('createdAt');
    res.status(StatusCodes.OK).json({courses});
};
const deleteAllCourses = async(_req,res) => {
    const courses=await Course.deleteMany({})
    res.status(StatusCodes.OK).json({message: 'All courses have been deleted'})
}
const getSingleCourse = async (req, res) => {
    const {id: courseId} = req.params;
    const course= await Course.findOne({ _id: courseId});

    if (!course) {
      throw new CustomError.NotFoundError(`No course with id : ${courseId}`);
    }
    res.status(StatusCodes.OK).json({ course});
};

const updateCourse = async (req, res) => {
    const { id: courseId } = req.params;
    if (req.body.schedule) {
      req.body.schedule = JSON.parse(req.body.schedule);
    }
    const course = await Course.findOneAndUpdate({ _id: courseId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      throw new NotFoundError(`No course with id : ${courseId}`);
    }


    res.status(StatusCodes.OK).json({ course });
};
// const uploadinserverImage = async (req, res) => {
//   console.log(req.files)
//   if (!req.files || !req.files.image) {
//     throw new BadRequestError('No File Uploaded');
//   }

//   const productImage = req.files.image;
//     if (!productImage.mimetype.startsWith('image')) {
//       throw new BadRequestError('Please Upload Image');
//     }

//     const maxSize = 1024 * 1024;
//     if (productImage.size > maxSize) {
//       throw new CustomError.BadRequestError('Please upload image smaller than 1MB');
//     }
//     const __dirname = dirname(fileURLToPath(import.meta.url));
//     const imagePath = path.join(__dirname, '../public/uploads/', productImage.name);
//     await productImage.mv(imagePath);
//   res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
// };
const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file_upload',
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image:result.secure_url  });
};

const endedCourse = async (req, res) => {
    const { id: courseId} = req.params;
    const {ended} = req.body
    await Course.findOneAndUpdate({ _id:courseId },{ended}, {
      new: true,
      runValidators: true,
    });
    res.status(StatusCodes.OK).json({ msg: 'Success! Course removed.' });
};

const deleteCourse = async (req, res) => {
  const { id: courseId} = req.params;
  await Course.findOneAndDelete({ _id:courseId })
  res.status(StatusCodes.OK).json({ msg: 'Success! Course removed.' });
};

export {
    createCourse,
    deleteCourse,
    uploadImage,
    getAllCourses,
    deleteAllCourses,
    getSingleCourse,
    updateCourse,
    endedCourse,
  };
