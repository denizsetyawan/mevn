import express from "express";
import mongoose from "mongoose";
import route from "./routes/index.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();

mongoose.connect("mongodb://localhost:27017/restful_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error);
});
db.once('open', () => {
    console.log('DB Connected');
});

//middleware - agar bisa menerima post dr data dlm format json
app.use(cors());
app.use(express.json());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev")); // configire morgan

app.use('/product', route); //otomatis di depan /product
app.use("/user", userRoutes);
app.use('/uploads', express.static('uploads'));

//file upload
// const upload = multer({
//     dest: './uploads'
// })

// app.post('/upload', upload.single("file"), (req,res) => {
//     res.json({ file: req.file })
//     console.log(String(req.file.path))
// })

app.listen('5000', () => {
    console.log('Server running at port: 5000')
});
