import express from 'express'
import bodyParser from 'body-parser';

import todosRoutes from './routes/todos';

const app = express();

app.use(bodyParser.json());

app.use(todosRoutes); // all URLs go through by default ('/', todosRoutes)

app.listen(3000);