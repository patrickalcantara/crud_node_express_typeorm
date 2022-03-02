import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController";
import { MovieController } from "./controllers/MovieController";

const routes = Router();

routes.post("/categorias", new CategoryController().create);
routes.get("/categorias", new CategoryController().read);
routes.put("/categorias/:id", new CategoryController().update);
routes.delete("/categorias/:id", new CategoryController().delete);

routes.post("/filmes", new MovieController().create);
routes.get("/filmes", new MovieController().read);
routes.put("/filmes/:id", new MovieController().update);
routes.delete("/filmes/:id", new MovieController().delete);

export { routes };
