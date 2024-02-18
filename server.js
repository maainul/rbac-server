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
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))

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