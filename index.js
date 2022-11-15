import express from "express";
import db from "./config/database.js";
import Routes from "./route/api.js";
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet"

dotenv.config();
const app = express();
const port  = process.env.PORT || 3000;

app.use(cors()); 
app.use(helmet());

try {
    await db.authenticate();
    console.log("database connected");
    await db.sync();  
} catch (error) {
    console.log(error)
}

app.use(express.json());
app.use(cookieParser());

app.use('/api', Routes);

app.listen(port, ()=>{
    console.log("server listening on port " + port);
})