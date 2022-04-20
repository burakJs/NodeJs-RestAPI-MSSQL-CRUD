import express from 'express';
import { appConfig } from './config.js';

import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', appConfig.PORT);

app.use(productsRoutes);
app.use(authRoutes);

export default app;
