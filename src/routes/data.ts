import mongoose from "mongoose";
import handleRouteError from "../utils/handle-route-errors";
import { Request, Response } from "express";

export default [
  {
    path: "/data",
    method: "get",
    async callback(req: Request, res: Response) {
      const Device = mongoose.model("Data");

      res.send({
        status: "ok",
        data: await Device.find({})
          .sort({ date: "desc" })
          .limit(100)
          .populate("device"),
      });
    },
  },
  {
    path: "/data/:deviceId",
    method: "get",
    async callback(req: Request, res: Response) {
      const Device = mongoose.model("Data");

      res.send({
        status: "ok",
        data: await Device.find({ device: req.params.deviceId })
          .sort({ date: "desc" })
          .limit(100)
          .populate("device"),
      });
    },
  },
  {
    path: "/data",
    method: "post",
    async callback(req: Request, res: Response) {
      res.send({
        status: "ok",
      });

      // const Device = mongoose.model("Data");
      // const data = req.body;
      // data.date = new Date();

      // try {
      //   await Device.create(data);

      //   res.send({
      //     status: "ok",
      //   });
      // } catch (error) {
      //   handleRouteError(error, res);
      // }
    },
  },
  {
    path: "/data/:id",
    method: "put",
    async callback(req: Request, res: Response) {
      const Device = mongoose.model("Data");
      const data = req.body;

      try {
        await Device.findOneAndUpdate({ _id: req.params.id }, data);

        res.send({
          status: "ok",
        });
      } catch (error) {
        handleRouteError(error, res);
      }
    },
  },
  {
    path: "/data/:id",
    method: "delete",
    async callback(req: Request, res: Response) {
      const Device = mongoose.model("Data");

      try {
        await Device.findOneAndDelete({ _id: req.params.id });

        res.send({
          status: "ok",
        });
      } catch (error) {
        handleRouteError(error, res);
      }
    },
  },
];
