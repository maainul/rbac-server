import { logger } from '../middleware/logMiddleware.js'


const findOne = async (model, field, value) => {
    try {
        const query = { [field]: value };
        const dTyp = await model.findOne(query);
        logger.info(`${model.modelName} found:`, dTyp);

        if (dTyp) {
            return { exists: true, message: `${model.modelName} with ${value} already exists` };
        } else {
            logger.info(`${model.modelName} with name ${value} not Found`);
            return { exists: false, message: null };
        }
    } catch (error) {
        logger.error(`Error finding ${model.modelName} name: ${error}`);
        throw error;
    }
};

export default findOne
