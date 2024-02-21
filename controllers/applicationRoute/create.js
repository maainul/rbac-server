import { serv } from './../../service/services.js'


export const create = async (req, res) => {
    try {
        const {
            applicationName,
            applicationModuleName,
            routeTitle,
            path,
            element,
            routeType,
            status
        } = req.body

        const routes = await serv.applicationRouteService.create({
            applicationName,
            applicationModuleName,
            routeTitle,
            path,
            element,
            routeType,
            status
        })
        // Created
        if (routes.statusCode === 201) {
            console.log(`${routes.message} :`.bgGreen);
            return res.status(201).send({
                success: routes.success,
                message: routes.message,
                data: routes.data,
            });
            // Already Exists
        } else if (routes.statusCode === 204) {
            console.log(`${routes.message} :`.bgGreen);
            return res.status(201).send({
                success: routes.success,
                message: routes.message,
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error In Create Router',
            error: error.message || error,
        });
    }
}