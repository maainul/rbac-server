import { logger } from "../../middleware/logMiddleware.js"
import { serv } from "../../service/services.js"

export const list = async(req,res) =>{
    try {
        logger.info("Application Route : list() controller called....")
        const appRoutes = await serv.applicationRouteService.list({req})
        return res.status(200).send({
            success: true,
            count : appRoutes.totalAppRoutes,
            message: 'Get all Application Route successfully',
            numOfPage:appRoutes.numOfPages,
            data: appRoutes.appRoutes
        });

    } catch (error) {
        console.error('Error In Get Application Routes:Controller :', error)
        const status = error.status || 500
        return res.status(status).send({
            success: false,
            message: 'Error In Get Application Routes',
            error: error.message || error,
        });
    }
}
