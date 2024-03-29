//API DOCUMENTATION
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import colors from "colors";
import connectDB from './config/connectDB.js';
import routes from "./routes/route.js";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import deserializeUser from './middleware/deserializeUser.js';

//configure env
dotenv.config()

//databse config
connectDB()

//Swagger api config
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Expense Tracker Application",
            description: "Nodejs Express Job Portal Application"
        },
        servers: [
            {
                url: "https://expense-tracker-app-lla1.onrender.com"
            },
            {
                url: "http://localhost:8081"
            },
            {
                url: "https://rbac-4g20.onrender.com"
            }
        ]
    },
    apis: [
        './routes/*.js'
    ]
};

const spec = swaggerJSDoc(options)

//rest object
const app = express()


//middelwares

app.use(deserializeUser)

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000", "https://rbac-frontend.netlify.app"],
    credentials: true,
}))

// Router
app.use('/api/v1', routes)

//homeroute of Swagger
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec))


const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white
    );
});
