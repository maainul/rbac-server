import { logger } from "../../middleware/logMiddleware.js"
import ApplicationRoute from '../../models/ApplicaitonRoute.js'

export const create = async (obj) => {
    try {
        logger.info('Create Application Route Service Start')
        const val = await ApplicationRoute.findOne({ path: obj.path })
        if (val !== null) {
            return {
                statusCode: 204, // Using 204 No Content makes it explicit that no content is being returned because the resource already exists and no changes were made
                success: true,
                message: 'Router Path Already Exists'
            }
        } else {
            const newRouter = new ApplicationRoute({
                applicationName: obj.applicationName,
                applicationModuleName: obj.applicationModuleName,
                routeTitle: obj.routeTitle,
                path: obj.path,
                element: obj.element,
                routeType: obj.routeType,
                status: obj.status
            })
            const saveRouter = await newRouter.save()
            logger.info('Create Application Route end With Success........ ')
            return {
                statusCode: 201, // 201 Created status code for new resources
                success: true,
                message: 'Router Successfully Created',
                data: saveRouter
            }
        }
    } catch (error) {
        logger.error("Errror Create New Router");
        const status = error.status || 500;
        return {
            statusCode: status,
            success: false,
            message: "Error In User Registration.",
            error: error.message || error,
        }
    }
}