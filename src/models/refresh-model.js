import { Schema, model } from "mongoose";

const refreshSchema = new Schema(
  {
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default model("Refresh", refreshSchema, "tokens");
