import express from "express";
import mongoose from "mongoose";
import route from "./routes/index.js";
import cors from "cors";

const app = express();

mongoose.connect("mongodb://localhost:27017/restful_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//setup method override
//app.use(methodOverride('_method'));
//const __dirname = path.resolve();
//app.use(express.static(path.join(__dirname + 'views')));

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
app.use('/product', route); //otomatis di depan /product

app.listen('5000', () => {
    console.log('Server running at port: 5000')
});
