import { Router } from "express";
import { Users } from "./controller";


export class AllUsers {

  static get routes(): Router {
    const router = Router();
    const todos = new Users();

    //Routes
    router.get("/",  todos.getUsers);
    router.get("/:id",  todos.getUserById);
    router.post("/",  todos.createUser);

    return router;
  }
}