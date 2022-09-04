import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        slug: { type: String, unique: true },
        title: { type: String },
        content: { type: String },
        cover: { type: String },
        subtitle: { type: String },
        likes: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Article", articleSchema, "articles");
