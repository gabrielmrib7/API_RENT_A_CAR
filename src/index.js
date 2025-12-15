import express from "express";
//import fs from "fs";
import router from "./router.js";
const app = express();
const port = 3000;


app.use(express.json());
app.use(router);

 

  export default app;
