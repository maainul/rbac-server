
const bcrypt = require('bcrypt')
const MValidator = require('../validator/MValidator')
const validationLog = require('../utils/validationLog');
const UserModel = require('../models/User');
const { AuthServ } = require('../services/auth');
const JWT = require('jsonwebtoken');
const { comparePassword } = require('../utils/authHelper');

// Validation Rules
const validationRules = {
    firstname: {
        type: 'string',
        required: true,
        max: 50,
        min: 3,
    },
    lastname: {
        type: 'string',
        required: true,
        max: 50,
        min: 3,
    },
    email: {
        type: 'string',
        required: true,
        max: 50,
        min: 3,
        exists: [true, 'Email already exists']
    },
    username: {
        type: 'string',
        required: true,
        max: 50,
        min: 3,
        exists: [true, 'Email already exists']
    },
    password: {
        type: 'string',
        required: true,
        max: 50,
        min: 3,
    },
    mobileNumber: {
        type: 'string',
        required: true,
        max: 13,
        min: 8,
        exists: [true, 'Mobile Number already exists']
    },
}

const validationRulesLogin = {
    password: {
        type: 'string',
        required: true,
        max: 50,
        min: 3,
    }
}

const signin = async (req, res) => {
    try {
        const validationResult = await MValidator(req.body, validationRulesLogin, UserModel);
        // Validation log
        validationLog(validationResult)
        if (!validationResult.isValid) {
            return res.status(201).send({
                success: true,
                message: 'Validation Failed',
                errors: validationResult.errors
            });
        }

        const { username, password } = req.body
        const validUser = await UserModel.findOne({ username });
        if (!validUser) {
            return res.status(201).send({
                success: true,
                message: 'User Not Found',
                errors: [{ "field": "username", "error": "user not found" }]
            });
        }

        const validPassword = await comparePassword(password, validUser.password)
        if (!validPassword) {
            return res.status(201).send({
                success: true,
                message: 'Wrong Credentials',
                errors: [{ "field": "password", "error": "password doesn't match" }]
            });
        }
        // token
        const token = JWT.sign({ id: validUser._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        return res.status(200).send({
            success: true,
            message: "Login successfull",
            user: {
                _id: validUser._id,
                username: validUser.username,
                email: validUser.email,
                mobileNumber: validUser.mobileNumber
            },
            token
        })
    } catch (error) {
        console.error('Internal Server Error', error)
        const status = error.status || 500
        return res.status(status).send({
            success: false,
            message: 'Internal Server Error',
            error
        });
    }
}

const signup = async (req, res) => {
    try {
        // Validation
        const validationResult = await MValidator(req.body, validationRules, UserModel);
        // Validation log
        validationLog(validationResult)
        if (!validationResult.isValid) {
            return res.status(201).send({
                success: true,
                message: 'Validation Failed',
                errors: validationResult.errors
            });
        }
        //Registration Service Call
        const user = await AuthServ.RegisterUserService(req.body)
        return res.status(201).send({
            success: user.success,
            message: user.message,
            data: user.data,
        });

    } catch (error) {
        console.error('Error In Create User:', error)

        const status = error.status || 500
        return res.status(status).send({
            success: false,
            message: 'Error In Create User',
            error: error.message || error,
        });
    }
};


const authServ = {
    signin,
    signup
}

module.exports = { authServ }



