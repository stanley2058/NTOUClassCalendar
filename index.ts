require("dotenv").config();
import express from "express";
import cors from "cors";
import { MongoOperator } from "./src/MongoOperator";
import { getCalendarTable } from "./src/Crawler";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get("/calendar", async (req, res) => {
  const { account } = req.query;
  if (!account) {
    res.sendStatus(400);
    return;
  }
  res.json(await MongoOperator.Instance.getRecordByAccount(account as string));
});

app.post("/fetchCalendar", async (req, res) => {
  const { account, password } = req.body;
  let record = await MongoOperator.Instance.getRecordByAccount(account);
  if (!record) record = { account, calendar: "" };

  const calendar = await getCalendarTable(account, password);
  record.calendar = calendar;
  res.json(await MongoOperator.Instance.saveRecord(record));
});

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Express server running on port: ${process.env.PORT ?? 3000}`);
});
