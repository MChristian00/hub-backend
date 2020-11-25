import { model, Schema } from "mongoose";

export default model(
  "Users",
  Schema(
    {
      _id: {
        type: Schema.Types.ObjectId,
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
