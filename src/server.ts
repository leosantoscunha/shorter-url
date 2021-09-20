import express from 'express';
import routes from './routes';
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(routes);

app.listen(3333);

export default app
