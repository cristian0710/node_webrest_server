import { Router } from "express";
import { TodosController } from "./controller";



export class TodoRoutes {

  static get routes(): Router {
    const router = Router();
    const todos = new TodosController();

    //Routes
    router.get("/", todos.getTodos); //es valido enviar tambien -> (req, res) => todos.getTodos(req, res)
    router.get("/:id", (req, res) => todos.getTodosById(req, res));
    router.post("/", (req, res) => todos.createTodo(req, res));
    router.put("/:id", (req, res) => todos.updateTodo(req, res));
    router.delete("/:id", (req, res) => todos.deleteTodo(req, res));

    return router;
  }
}