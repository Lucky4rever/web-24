import express from "express";
import bodyParcer from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParcer());

