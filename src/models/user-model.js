import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        avatar: { type: String },
        username: { type: String },
        password: { type: String, required: true },
        name: {
            required: true,
            type: String,
            default: "User",
        },
        github: { type: String },
        linkedin: { type: String },
        about: { type: String },
        verified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema, "users");
