import multer from "multer";

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
      cb(null, true);
    } else {
      cb(new Error("Not a jpg File!!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
}).single("pict");

export default upload;