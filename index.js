import express from "express";
import db from "./config/database.js";
import Users from "./model/UserModel.js";
import Routes from "./route/api.js";
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port  = process.env.PORT || 8000;

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

try {
    await db.authenticate();
    console.log("database connected");
    await db.sync();  
} catch (error) {
    console.log(error)
}

app.use(express.json());
app.use(cookieParser());

app.use('/api' ,Routes);

app.listen(port, ()=>{
    console.log("server listening on port " + port);
})