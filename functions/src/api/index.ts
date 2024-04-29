import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { defineRoutes } from './routes';

export const api = onRequest({ minInstances: 0 }, (() => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(compression());
    app.use(morgan('dev'));

    defineRoutes({ app });

    // catch 404 and forward to error handler
    app.use(function(req, res) {
        res.status(404).send({
            error: 404,
            host: req.headers.host,
            path: req.url,
            message: 'Api: La ruta que estás buscando no existe',
            env: req.app.get('env')
        });
    });

    return app;
})());
