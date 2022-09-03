import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: { type: String },
        content: { type: String },
        cover: { type: String },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Article", articleSchema, "articles");
