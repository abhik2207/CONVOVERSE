import * as Controller from "../app/controllers/index.js";
import * as Validation from "../utility/validations.js  ";

const applyRoutes = (app) => {
    app.get('/', (req, res) => res.json('API is running!'));

    app.post('/user', Validation.validateCreateUser, Controller.createUser);

    app.post('/login', Validation.validateLogin, Controller.loginUser);

    app.post('/channel', Validation.validateCreateChannel, Controller.createChannel);

    app.get('/channel-list', Validation.validateGetChannels, Controller.getChannels);

    app.get('/search-user', Validation.validateSearchUser, Controller.searchUser);

    app.post('/message', Validation.validateAddMessage, Controller.sendMessage);
}

export default applyRoutes;