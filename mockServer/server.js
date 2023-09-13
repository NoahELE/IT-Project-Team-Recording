const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Load and apply route mappings from routes.json
const routes = require('./routes.json');
const rewriter = jsonServer.rewriter(routes);
server.use(rewriter);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.use(jsonServer.bodyParser)
server.post('/api/user/login', (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const user = router.db.get('user').find({ username, password }).value();

    if (user) {
      res.jsonp({
        isAdmin: user.isAdmin,
        access: "QpwL5tke4Pnpja7X4",
        refresh: "Asdzxke7sNdsi2F6"
      });
    } else {
      res.status(400).jsonp({
        error: "Invalid username or password"
      });
    }
  }
});

server.post('/api/user/signup', (req, res) => {
  if (req.method === 'POST') {
    const newUser = req.body;
    const users = router.db.get('user').value();
    const maxId = Math.max(...users.map(user => user.id));

    newUser.id = maxId + 1;
    const user = {
      id: newUser.id,
      ...newUser
    };

    router.db.get('user').push(user).write();
    res.status(201).jsonp(user);
  }
});

server.post('/api/recording', (req, res) => {
  if (req.method === 'POST') {
    const newRecording = req.body;
    const recordings = router.db.get('recording').value();
    const maxId = Math.max(...recordings.map(recording => recording.id));

    const recording = {
      id: maxId + 1,
      ...newRecording
    };

    router.db.get('recording').push(recording).write();
    res.status(201).jsonp(recording);
  }
});

server.get('/api/recording', (req, res) => {
  if (req.method === 'GET') {
    const recordings = router.db.get('recording').value();
    res.jsonp(recordings);
  }
});

server.use(router);
const port = 4000;
server.listen(port, () => {
  console.log('json-server is running on port ' + port);
});
