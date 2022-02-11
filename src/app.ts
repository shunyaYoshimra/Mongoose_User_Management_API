import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose from "mongoose";
import Controller from "./interfaces/controller.interface";


class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initMiddlerwares();
    this.initControllers(controllers);
    this.connectToTheDatabase();
  }

  public listen() {
    this.app.listen(3000, () => {
      console.log("App listening on the port: 3000");
    });
  }

  public getServer() {
    return this.app;
  }

  private initMiddlerwares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      name: "secret-id"
    }));
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private connectToTheDatabase() {
    mongoose.connect("mongodb://localhost:27017/day3_db").then(() => {
      console.log("Database Connected Successfully!");
    }).catch((err) => {
      console.log(err);
    });
  }
}

export default App;