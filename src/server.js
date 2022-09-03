import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routes";
import DBConnect from "./config/db";

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

const corsOption = {
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:4000"],
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json());
app.use(morgan("dev"));
app.use(router);
DBConnect();

// base url
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello there" });
});

// listen
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
