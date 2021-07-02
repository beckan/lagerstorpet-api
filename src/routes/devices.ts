import mongoose from "mongoose";
import handleRouteError from "../utils/handle-route-errors";
import {Request, Response} from 'express';
import axios from "axios";
import getDeviceStatus from "../utils/get-device-status";

export default [
    {
        path: '/devices',
        method: 'get',
        async callback (req: Request, res: Response) {
            const Device = mongoose.model('Device');

            try {
                res.send({
                    status: 'ok',
                    data: await Device.find({}).populate('type')
                });
            } catch (error) {
                console.error(error);
                handleRouteError(error, res);
            }
        }
    },
    {
        path: '/devices',
        method: 'post',
        async callback (req: Request, res: Response) {
            const Device = mongoose.model('Device');
            const data = req.body;

            try {
                await Device.create(data);

                res.send({
                    status: 'ok'
                });
            } catch (error) {
                handleRouteError(error, res);
            }
        }
    },
    {
        path: '/devices/:id',
        method: 'get',
        async callback (req: Request, res: Response) {
            const Device = mongoose.model('Device');

            try {
                const document = await Device.findOne({_id: req.params.id}).populate('type');
                const data: any = document.toObject();

                // const deviceStatus = await getDeviceStatus(data.address);
                const deviceStatus = null;

                setTimeout(() => {
                    res.send({
                        status: 'ok',
                        data: {
                            ...data,
                            unit: '°C',
                            value: deviceStatus ? deviceStatus.temperature : null
                        }
                    });
                }, 1);
                
            } catch (error) {
                console.error(error);
                handleRouteError(error, res);
            }
        }
    },
    {
        path: '/devices/:id',
        method: 'put',
        async callback (req: Request, res: Response) {
            const Device = mongoose.model('Device');
            const data = req.body;

            try {
                await Device.findOneAndUpdate({_id: req.params.id}, data);

                res.send({
                    status: 'ok'
                });
            } catch (error) {
                handleRouteError(error, res);
            }
        }
    },
    {
        path: '/devices/:id',
        method: 'delete',
        async callback (req: Request, res: Response) {
            const Device = mongoose.model('Device');

            try {
                await Device.findOneAndDelete({_id: req.params.id});

                res.send({
                    status: 'ok'
                });
            } catch (error) {
                handleRouteError(error, res);
            }
        }
    }
];