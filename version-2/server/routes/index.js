const applyRoutes = (app) => {
    app.get('/', (req, res) => res.json('API is running!'));

    app.post('/user', (req, res) => res.json('Create user!'));

    app.post('/login', (req, res) => res.json('Login user!'));

    app.post('/channel', (req, res) => res.json('Channel creation!'));

    app.get('/search-user', (req, res) => res.json('Search user!'));

    app.get('/channel-list', (req, res) => res.json('Channel List!'));

    app.post('/message', (req, res) => res.json('Send message!'));
}

// API'S TO CREATE  ->  ->  ->  Create user, Login user, Channel creation, Search user, Channel list, Send message



export default applyRoutes;