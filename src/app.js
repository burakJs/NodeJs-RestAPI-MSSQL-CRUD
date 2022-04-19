import express from 'express';
import config from './config.js';

import productsRoutes from './routes/products.routes.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', config.PORT);

app.use(productsRoutes);

export default app;
