import { connect } from "mongoose";
import Record, { RecordModel } from "./entities/Record";

export class MongoOperator {
  private static instance: MongoOperator;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {
    connect(process.env.MONGODB_URI ?? "").catch((error) =>
      console.error(error)
    );
  }

  async saveRecord(record: Record): Promise<Record> {
    const model = new RecordModel(record);
    if (record._id) model.isNew = false;
    return await model.save();
  }

  async getRecordByAccount(account: string): Promise<Record | null> {
    const res = await RecordModel.findOne({ account: account }).exec();
    return res || null;
  }
}
