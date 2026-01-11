// import {v2 as cloudinary} from 'cloudinary'
// import fs from 'fs'

// const uploadOnCloudinary=async (file) => {
//    try {
//      cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret:process.env.CLOUDINARY_API_SECRET
//     });
//     cloudinary.uploader.upload(file,{
//         resource_type:'auto'
//     })

//     fs.unlinkSync(file)

//     return result.secure_url
//    } catch (error) {
//     fs.unlinkSync(file)
//     console.log(error)
//    }
// }

// export default uploadOnCloudinary

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (file) => {
    try {
        if (!file) {
            console.log("No file path provided");
            return null;
        }

        const result = await cloudinary.uploader.upload(file, {
            resource_type: 'auto',
            folder: 'profiles'
        });

        console.log("Cloudinary upload successful:", result.secure_url);

        // File delete karo successful upload ke baad
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }

        return result.secure_url; // Ya puri result object return karo

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        
        // Error ke baad bhi file delete karo
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
        
        return null;
    }
};

export default uploadOnCloudinary;