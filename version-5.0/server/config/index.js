import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";

const configureExpressApp = (app) => {
    // Parse URL-encoded data and populate req.body
    app.use(bodyParser.urlencoded({extended:true}));

    // Parse JSON data and populate req.body
    app.use(bodyParser.json());

    // Enable response compression with compression level 9
    app.use(compression(9));

    // Enable Cross-Origin Resource Sharing (CORS)
    app.use(cors());
}

export default configureExpressApp;