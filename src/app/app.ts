import express, { Application, Request, Response, NextFunction } from 'express';
import { json } from "body-parser"
import Controller from './controller.interface';
 
class App {
  public app: Application;
  public port: string | undefined;
 
  constructor(controllers: Controller[], port: string | undefined) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(json());
    this.app.use(this.loggerMiddleware);
  }
 
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(async (controller) => {
      this.app.use('/', controller.router);
      await controller.init();
    });
  }

  private loggerMiddleware(request: Request, response: Response, next: NextFunction) {
    console.log(`${request.method} ${request.path}`);
    next();
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;
