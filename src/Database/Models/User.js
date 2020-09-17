const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Users",
  mongoose.Schema(
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      FirstName: {
        type: String,
        required: true,
      },
      LastName: {
        type: String,
        required: true,
      },
      // Username: {
      //   type: String,
      //   required: true,
      // },
      Email: {
        type: String,
        required: true,
        unique: true,
      },
      Password: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
