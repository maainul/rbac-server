import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    valid: {
        type: Boolean, default: true,
    },
    userAgent: {
        type: String
    },
}, { timeseries: true })

export default mongoose.model("Session", sessionSchema)