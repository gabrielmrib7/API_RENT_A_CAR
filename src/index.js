import express from "express";
import router from "./router.js";
import serverless from "serverless-http";

const app = express();

app.use(express.json());
app.use("/api", router); // suas rotas

 export default app;