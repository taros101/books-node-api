import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import apiV1 from './apiV1/index';
import * as errorHandler from './helpers/errorHandler';

var jsonParser       = bodyParser.json({limit:102400*102400*20, type:'application/json'});
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:102400*102400*20,type:'application/x-www-form-urlencoding' })





class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(jsonParser); // I added
    this.express.use(bodyParser.json());
    this.express.use(urlencodedParser); // I added
    // this.express.use(bodyParser.urlencoded({ extended: false }));
    // this.express.use(urlencodedParser); // I added
    // this.express.use(jsonParser); // I added
    this.express.use(helmet());
  }

  private setRoutes(): void {
    this.express.use('/v1', apiV1);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }
}


export default new App().express;
