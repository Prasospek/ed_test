import express from "express";
import bodyParser from "body-parser";   // parsin through json
import mongoose from "mongoose";
import cors from "cors" //  Cross-Origin Resource Sharing and allows making cross-origin HTTP requests from a web browser.
import dotenv from "dotenv" // for .env
import multer from "multer";        // uploads
import morgan from "morgan" // http request logging
import path from "path";
import {fileURLToPath} from "url";
import helmet from "helmet";    // securing HTTP headers
import {register} from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";


/* CONFIGURATIONS */
//  Creates a constant __filename that holds the file path of the currently executing module.
const __filename = fileURLToPath(import.meta.url);

//  Creates a constant __dirname that holds the directory path of the currently executing module.
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


/* ROUTES  WITH FILES ! */
/* toto tu musi byt protoze pouzivame upload*/
app.post("/auth/register", upload.single("picture"), register);



/* ROUTES */
app.use("/auth", authRotues);
app.use("/users", userRoutes)




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