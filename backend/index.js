import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer";
import morgan from "morgan"
import path from "path";
import {fileURLToPath} from "url";
import helmet from "helmet";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
// Middleware for parsing JSON request bodies with limit and extended options
app.use(express.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))) // setting directory of wheer we keep our assets


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "public/assets");
    },
    filename(req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({storage});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8001;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () =>{
        console.log(`Listening on port ${PORT}`)
    })
}).catch((error) => {
    console.log(`ERROR: ${error} did not connect`)
})