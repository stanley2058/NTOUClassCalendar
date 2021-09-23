import { model, Schema, Types } from "mongoose";

export default interface Record {
  _id?: Types.ObjectId;
  account: string;
  calendar: string;
}

export const RecordSchema = new Schema<Record>({
  account: { type: String, require: true },
  calendar: { type: String, require: true },
});

export const RecordModel = model<Record>("Record", RecordSchema);
