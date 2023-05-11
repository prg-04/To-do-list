import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config, { output } from './webpack.config.js';

const app = express();

const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: output.publicPath,
  }),
);

app.listen(3000);
