  import PhotoWithVideo from '../models/PhotoWithVideo.js';
  import { v2 as cloudinary } from 'cloudinary';
  import { StatusCodes } from 'http-status-codes';
  import fs from 'fs';

  export const uploadVideo = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Create a readable stream from the uploaded file
    const fileStream = fs.createReadStream(req.file.path);
    const fileSize = req.file.size; // Size of the file in bytes

    let uploadedBytes = 0;
    let startTime = Date.now();

    // Define the upload stream to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
      },
      async (error, result) => {
        // Handle upload completion or error
        if (error) {
          return res.status(500).json({ msg: 'Video upload failed', error });
        }

        // Remove the temporary file
        await fs.promises.unlink(req.file.path);

        // Respond with the video URL
        res.status(200).json({
          video: result.secure_url,
        });
      }
    );

    // Listen for data events to calculate progress
    fileStream.on('data', (chunk) => {
      uploadedBytes += chunk.length;

      // Calculate the elapsed time
      const elapsedTime = (Date.now() - startTime) / 1000; // in seconds

      // Estimate the total upload time
      const estimatedTotalTime = (elapsedTime * fileSize) / uploadedBytes;

      // Calculate the remaining time
      const remainingTime = estimatedTotalTime - elapsedTime;

      console.log(`Uploaded: ${((uploadedBytes / fileSize) * 100).toFixed(2)}%`);


    });

    // Pipe the file stream to the Cloudinary upload stream
    fileStream.pipe(uploadStream);
  };
  export const uploadImage = async (req, res) => {
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

    export const createPhotoWithVideo = async (req, res) => {
      req.body.user = req.user.userId;
      const photoWithVideo = await PhotoWithVideo.create(req.body);
      res.status(StatusCodes.CREATED).json({ photoWithVideo })
    };

    export const deletePhotoWithVideo = async (req, res) => {
      const { id: videoId } = req.params;
    await PhotoWithVideo.findOneAndDelete({_id: videoId });

      res.status(StatusCodes.CREATED).json({ msg: 'Success! video and photo removed.' })
    };

    export const getPhotoWithVideo = async (req,res) => {
      const images= await PhotoWithVideo.find({});
      res.status(StatusCodes.OK).json({images});
    }

    // export const handleMediaUploadAndCreate = async (req, res) => {
    //     req.body.user = req.user.userId;
    //     const { category, description } = req.body;
    //     let imageUrl = null;
    //     let videoUrl = null;

    //     if (req.files?.image) {
    //       const imageResult = await cloudinary.uploader.upload(
    //         req.files.image.tempFilePath,
    //         {
    //           use_filename: true,
    //           folder: 'file_upload',
    //         }
    //       );
    //       fs.unlinkSync(req.files.image.tempFilePath);
    //       imageUrl = imageResult.secure_url;
    //     }

    //     if (req.files?.video) {
    //       const videoResult = await cloudinary.uploader.upload_large(
    //         req.files.video.tempFilePath,
    //         {
    //           resource_type: 'video',
    //         }
    //       );
    //       fs.unlinkSync(req.files.video.tempFilePath);
    //       videoUrl = videoResult.secure_url;
    //     }

    //     const newEntry = await PhotoWithVideo.create({
    //       category,
    //       description,
    //       image: imageUrl,
    //       video: videoUrl,
    //     });

    //     res.status(StatusCodes.CREATED).json({ newEntry });

    // };
