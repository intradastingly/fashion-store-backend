const multer = require("multer")

const multerStorage = multer.diskStorage({
    destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
        cb(null, "../client/src/assets/");
    },
    filename: (req: any, file: { mimetype: string; fieldname: any; }, cb: (arg0: null, arg1: string) => void) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
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
    fileFilter: multerFilter,
})

exports.uploadImg = upload.single('img')