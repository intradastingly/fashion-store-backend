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

const upload = multer({
    fileFilter: function (req: { fileValidationError: string; }, file: { originalname: any; }, cb: (arg0: null, arg1: boolean, arg2: string) => void) {
        let ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
             req.fileValidationError = "Forbidden extension";
             return cb(null, false, req.fileValidationError);
       }
       cb(null, true, "File Uploaded");
    },
    storage: multerStorage,
    limits:{fileSize: 10000000},
    
})

exports.uploadImg = upload.single('img')