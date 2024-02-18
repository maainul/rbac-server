import { logger } from "../../middleware/logMiddleware.js";
import ExpenseTypeModel from "../../models/ExpenseType.js"


export const getAllExpTypeServ = async ({ req }) => {
    // Query Parameter for Search
    const { search, sort } = req.query;

    //conditons for searching filters
    let queryObject = {};

    // Check Search from query
    if (search) {
        queryObject.name = { $regex: search, $options: "i" };
    }

    // Build the Mongoose query
    let queryResult = ExpenseTypeModel.find(queryObject);

    // Sorting
    if (sort === "latest") {
        queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "oldest") {
        queryResult = queryResult.sort("createdAt");
    }
    if (sort === "a-z") {
        queryResult = queryResult.sort("name");
    }
    if (sort === "z-a") {
        queryResult = queryResult.sort("-name");
    }

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    queryResult = queryResult.skip(skip).limit(limit);

    // Expense-type count
    const totalExpTyps = await ExpenseTypeModel.countDocuments(queryResult);
    const totlExpTyp = await ExpenseTypeModel.countDocuments(queryObject);

    const numOfPage = Math.ceil(totlExpTyp / limit);
    // Execute Query
    const expTyps = await queryResult;
    logger.info(`Expense Type data From Expense Type Service==> \n ${expTyps}`);
    return {
        totalExpTyps,
        expTyps,
        numOfPage
    }
}

