// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null,"./public")
//     },
//     filename:(req, file, cb)=>{
//         cb(null, file.originalname)
//     }
// })

// export const upload=multer(storage)

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, ext);
        cb(null, nameWithoutExt + '-' + uniqueSuffix + ext);
    }
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024  // 5MB
    }
    // fileFilter ko hata diya - ab koi bhi file accept hogi
});