export {};
import {model, Schema} from "mongoose";

const fileSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
      },
      name: {
        type: String,
        required: [true, "Uploaded file must have a name"],
      },
});

module.exports = model("imageUpload", fileSchema);
