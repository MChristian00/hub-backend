const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Blogs",
  mongoose.Schema(
    {
      _id: mongoose.Schema.Types.ObjectId,
      AuthorID: {
        type: mongoose.Schema.Types.ObjectId,
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
