import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";
import { AllUsers } from "./users/routes";

export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    //Routes
    router.use("/api/todos", TodoRoutes.routes);
    router.use("/api/users", AllUsers.routes);

    return router;
  }
}
