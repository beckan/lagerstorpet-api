import mongoose, { Schema, Document } from "mongoose";

export interface Data extends Document {
  device: {};
  unit: "celcius";
  value: string;
  date: Date;
}

const DataSchema: Schema = new Schema({
  device: {
    type: Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
  unit: {
    type: String,
    enum: ["celcius", "meter"],
  },
  value: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<Data>("Data", DataSchema, "data");
