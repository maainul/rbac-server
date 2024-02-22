import ApplicaitonRoute from "../../models/ApplicaitonRoute.js"

export const list = async({req}) =>{

        // Query Parameter for Search
        const {search,sort} = req.query

        //conditions for searching filters
        let queryObject = {}

        // Check Swarch search for query
        if(search){
            queryObject.routeTitle = {$regex:search,$options:"i"};
        }

        // Build the Mongoose query
        let queryResult = ApplicaitonRoute.find(queryObject)

        //Sorting
        if(sort === "latest"){
            queryResult = queryResult.sort("-createAt")
        }
        if(sort === "oldest"){
            queryResult = queryResult.sort("createAt");
        }
        if(sort === "a-z"){
            queryResult = queryResult.sort("routeTitle");
        }
        if(sort === "z-a"){
            queryResult = queryResult.sort("-routeTitle");
        }

        //pagination
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page -1) * limit

        queryResult = queryResult.skip(skip).limit(limit)

        // Application Route Count
        const totalAppRoutes = await ApplicaitonRoute.countDocuments(queryResult)
        const totalAppRoute =  await ApplicaitonRoute.countDocuments(queryObject)

        const numOfPages = Math.ceil(totalAppRoute / limit)

        //Execute Query
        const appRoutes = await queryResult

        return{
            totalAppRoutes,
            appRoutes,
            numOfPages
        }
}
