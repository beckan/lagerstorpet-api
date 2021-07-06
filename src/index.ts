import express, { Response, Request } from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import cors from "cors";
import "./models";
import routes from "./routes";
import auth from "./middlewares/auth";
import * as packageJSON from "../package.json";
import cron from "node-cron";
import { getDeviceData } from "./cron/get-device-data";

const app = express();

app.use(cors());
app.use(json());
app.use(auth);

routes(app);

app.get("*", (req: Request, res: Response) => {
  res.send({ status: "ok" });
});

const listen = () => {
  app.listen(3000);
  console.log(
    `\n\nLagerstorpet API ${packageJSON.version} is running at port 3000\n\n`
  );
};

const cronJob = cron.schedule(
  "0 0,15,30,45 * * * *",
  () => {
    getDeviceData();
    console.log(new Date());
    console.log("Get device data");
  },
  {
    scheduled: false,
  }
);

mongoose.connection.on("error", console.log).once("open", async () => {
  listen();
  cronJob.start();
});

mongoose.connect("mongodb://localhost:27017/lagerstorpet", {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
