import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";
import userModel from "../models/user.model";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private user = userModel;

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.path, this.retrieveUsers);
    this.router.get(`${this.path}/:id`, this.retrieveUser);
    this.router.post(this.path, this.createUser);
    this.router.put(this.path, this.updateUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  private retrieveUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.user.find();
      res.status(200).json({
        message: "Successfully Retrieved",
        data: users
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something wrong happned",
        error: error
      });
    }
  }

  private retrieveUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const user = await this.user.findById(id);
      res.status(200).json({
        message: "Successfully Retrieved",
        data: user
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something wrong happned",
        error: error
      });
    }
  }

  private createUser = async (req: Request, res: Response) => {
    const name = req.body.name;
    const password = req.body.password;
    try {
      const User = new this.user({
        name: name,
        password: password
      });
      await User.save();
      res.status(200).json({
        message: "Successfully Created"
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something wrong happned",
        error: error
      });
    }
  }

  private updateUser = async (req: Request, res: Response) => {
    const id = req.body.id;
    const password = req.body.password;
    try {
      await this.user.updateOne({ _id: id }, { $set: { password: password } })
      res.status(200).json({
        message: "Successfully Updated"
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something wrong happned",
        error: error
      });
    }
  }

  private deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await this.user.deleteOne({ name: id });
      res.status(200).json({
        message: "Successfull Deleted"
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something wrong happned",
        error: error
      });
    }
  }
}

export default UserController;