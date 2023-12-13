import * as Controller from "../app/controllers/index.js";
import * as Validation from "../utility/validations.js  ";

const applyRoutes = (app) => {
    // Default route to check if the API is running
    app.get('/', (req, res) => res.json('API is running!'));

    // Route to create a new user, with validation and controller handling
    app.post('/user', Validation.validateCreateUser, Controller.createUser);

    // Route for user login, with validation and controller handling
    app.post('/login', Validation.validateLogin, Controller.loginUser);

    // Route to create a new channel, with validation and controller handling
    app.post('/channel', Validation.validateCreateChannel, Controller.createChannel);

    // Route to get a list of channels, with validation and controller handling
    app.get('/channel-list', Validation.validateGetChannels, Controller.getChannels);

    // Route to search for a user, with validation and controller handling
    app.get('/search-user', Validation.validateSearchUser, Controller.searchUser);

    // Route to send a message, with validation and controller handling
    app.post('/message', Validation.validateAddMessage, Controller.sendMessage);
}

export default applyRoutes;