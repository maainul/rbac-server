import mongoose from "mongoose";

const applicationRouteSchema = new mongoose.Schema({
    applicationName: {
        type: String
    },
    applicationModuleName: {
        type: String
    },
    routeTitle: {
        type: String,
    },
    path: {
        type: String
    },
    element: {
        type: String
    },
    routeType: {
        type: String
    },
    status: {
        type: Boolean
    }
}, { timestamps: true })


export default mongoose.model('ApplicationRoute', applicationRouteSchema)
