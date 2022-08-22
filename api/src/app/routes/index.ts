import { Router as RouterWrapper } from 'apiframework/router';

import { HTTPErrorMiddleware, ParseBodyMiddleware } from 'apiframework/middlewares';

const Router = new RouterWrapper();

Router.pipeline([ParseBodyMiddleware, HTTPErrorMiddleware]);

