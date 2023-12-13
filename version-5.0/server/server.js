import APP from "express";
import connectDB from "./dbConnection/index.js";
import configureExpressApp from "./config/index.js";
import applyRoutes from "./routes/index.js";

// Creating a new instance of the Express application
const app = new APP();

// Configuring the Express application using the imported function
configureExpressApp(app);

// Defining the port on which the server will run
const PORT = 3005;

// Function to start the server
const startServer = () => {
    Promise.all([connectDB()]).then(() => {
        app.listen(PORT);
        console.log(`-- Server started at port ${PORT} --`);
        applyRoutes(app);
    })
}

startServer();