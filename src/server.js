import express from "express";
import cors from "cors";
import morgan from "morgan";
import DBConnect from "./config/db";

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

const corsOption = {
    credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(morgan("dev"));
// app.use(router);
DBConnect();

// base url
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello there" });
});

// listen
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
