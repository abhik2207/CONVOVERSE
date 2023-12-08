import APP from "express";
import connectDB from "./dbConnection/index.js";
import configureExpressApp from "./config/index.js";
import applyRoutes from "./routes/index.js";

const app = new APP();
configureExpressApp(app);

const PORT = 3005;

const startServer = () => {
    Promise.all([connectDB()]).then(() => {
        app.listen(PORT);
        console.log(`-- Server started at port ${PORT} --`);
        applyRoutes(app);
    })
}

startServer();