import { model, Schema } from "mongoose";

export default model(
  "Blogs",
  Schema(
    {
      _id: Schema.Types.ObjectId,
      AuthorID: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
      Author: {
        type: String,
        trim: true,
        required: true,
      },
      Content: {
        type: String,
        trim: true,
        required: true,
      },
      Title: {
        type: String,
        trim: true,
        required: true,
      },
      viewsCount: { type: Number, default: 0 },
      LikedBy: { type: Array },
      FavBy: { type: Array },
      Comments: { type: Array },
    },
    {
      timestamps: true,
    }
  )
);
