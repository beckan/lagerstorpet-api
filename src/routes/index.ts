import dataRoutes from './data';
import devicesRoutes from './devices';
import deviceTypesRoutes from './deviceTypes';

export default (app) => {
    const routes = [].concat(dataRoutes, devicesRoutes, deviceTypesRoutes);

    routes.forEach((route) => {
        app[route.method](route.path, route.callback);
    });
};