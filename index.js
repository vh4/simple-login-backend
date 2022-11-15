import express from "express";
import db from "./config/database.js";
import Routes from "./route/api.js";
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import  { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port  = process.env.PORT || 8000;

try {
    await db.authenticate();
    console.log("database connected");
    await db.sync();  
} catch (error) {
    console.log(error)
}

app.use(cors());
const options = {
    target: 'https://ap1-backend.herokuapp.com/api', // target host with the same base path
    changeOrigin: true, // needed for virtual hosted sites
  };
  
  
const ProxyCreated = createProxyMiddleware(options);
app.use('/api', ProxyCreated);
app.use(express.json());
app.use(cookieParser());
app.use('/api', Routes);

app.listen(port, ()=>{
    console.log("server listening on port " + port);
})