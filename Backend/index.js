require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const { app, server } = require("./socket/socket");
const AuthRoute = require('./Router/auth-router');
const GymRoute = require("./Router/gym-router")


const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://192.168.0.199:5173",
    "https://gym-mangement-frontend.vercel.app"
];

var cors = require('cors');


app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true); // Allow the origin
            } else {
                callback(new Error("Not allowed by CORS")); // Reject the origin
            }
        },
        methods: ['GET', 'POST', "PUT", "DELETE"], // Allow specific HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allow specific headers
        exposedHeaders: ['Authorization', 'X-Total-Count'], // Expose specific response headers
        credentials: true, // Allow cookies
        maxAge: 600
    })
);

app.use(bodyParser.json({ limit: '50mb' }));

const connectDb = require("./utils/db");

app.use(express.json()) // this is the middleware
app.use('/api/auth', AuthRoute);
app.use('/api', AuthRoute);

app.use("/api/gym", GymRoute);

app.get('/', (req, res) => {
    res.json({ "message": "hello world" });
});

connectDb().then(() => {
    server.listen(5000, () => console.log("server is running on port 5000"));

}).catch((err) => console.log("erroorrr occucered", err))
