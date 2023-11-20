const fs = require('fs');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('server/database.json');
const userdb = JSON.parse(fs.readFileSync('server/users.json', 'UTF-8'));

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser)

const SECRET_KEY = 'productlab';

const createToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

const isRealUser = ({ email, password }) => userdb.users.findIndex((user) => user.email === email && user.password === password) !== -1;

server.get('/auth', (req, res) => {
  const { authorization } = req.headers;
  if (!authorization || authorization.split(' ')[0] !== 'Bearer') {
    res.status(401).json('Unauthenticated');
    return;
  }
  try {
    let verifyTokenResult = verifyToken(authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      res.status(401).json('Invalid access token');
      return;
    }
    res.status(200).json(verifyTokenResult);
    return;
  } catch (err) {
    res.status(401).json('Access token is revoked');
  }
});

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!isRealUser({ email, password })) {
    return res.status(401).json('Incorrect email or password');
  }
  const accessToken = createToken({ email });
  res.status(200).json({ accessToken });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization.split(' ')[0] !== 'Bearer') {
    res.status(401).json('Unauthenticated');
    return;
  }
  try {
    let verifyTokenResult = verifyToken(authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      res.status(401).json('Invalid access token');
      return;
    }
    next();
  } catch (err) {
    res.status(401).json('Access token is revoked');
  }
});

server.use(router);

server.listen(8000, () => {
  console.log('Run Auth API Server');
});
