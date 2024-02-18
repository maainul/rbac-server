import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minlength: [3, 'firstname must be three characters long'],
        maxlength: [50, 'User firstname can not be longer than 50 characters long']
    },
    lastname: {
        type: String,
        minlength: [3, 'lastname must be three characters long'],
        maxlength: [50, 'User lastname can not be longer than 50 characters long']
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    mobileNumber: {
        type: String,
    },
    area: {
        type: String,
    },
    town: {
        type: String,
    },
    city: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
}, { timestamps: true })

export default mongoose.model('User', userSchema)