const multer = require("multer")
const path = require("path")

const multerStorage = multer.diskStorage({
    destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
        cb(null, "../client/public/");
    },
    filename: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
        cb(null, `${file.fieldname}-${Date.now()}` + path.extname(file.originalname));
    },
    });

    const multerFilter = (req: any, file: { mimetype: string; }, cb: (arg0: Error | null, arg1: boolean) => void) => {
    if (file.mimetype.split("/")[1] === "jpg" || "png") {
        cb(null, true);
    } else {
        cb(new Error("Not an image File!!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    limits:{fileSize: 1000000},
    fileFilter: multerFilter,
})

exports.uploadImg = upload.single('img')