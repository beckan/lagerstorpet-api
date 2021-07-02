import mongoose from "mongoose";
import handleRouteError from "../utils/handle-route-errors";
import {Request, Response} from 'express';

export default [
    {
        path: '/deviceTypes',
        method: 'get',
        async callback (req: Request, res: Response) {
            const Device = mongoose.model('DeviceType');

            try {
                setTimeout(async () => {
                    res.send({
                        status: 'ok',
                        data: await Device.find({})
                    });
                }, 1);
            } catch (error) {
                handleRouteError(error, res);
            }
        }
    },
    {
        path: '/deviceTypes',
        method: 'post',
        async callback (req: Request, res: Response) {
            const DeviceType = mongoose.model('DeviceType');
            const data = req.body;

            try {
                await DeviceType.create(data);

                res.send({
                    status: 'ok'
                });
            } catch (error) {
                handleRouteError(error, res);
            }
        }
    },
    {
        path: '/deviceTypes/:id',
        method: 'put',
        async callback (req: Request, res: Response) {
            const DeviceType = mongoose.model('DeviceType');
            const data = req.body;

            try {
                await DeviceType.findOneAndUpdate({_id: req.params.id}, data);

                res.send({
                    status: 'ok'
                });
            } catch (error) {
                handleRouteError(error, res);
            }
        }
    },
    {
        path: '/deviceTypes/:id',
        method: 'delete',
        async callback (req: Request, res: Response) {
            const DeviceType = mongoose.model('Device');

            try {
                await DeviceType.findOneAndDelete({_id: req.params.id});

                res.send({
                    status: 'ok'
                });
            } catch (error) {
                handleRouteError(error, res);
            }
        }
    }
];