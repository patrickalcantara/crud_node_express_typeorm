import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController";

const routes = Router();

routes.post("/categorias", new CategoryController().salvar);
routes.get("/categorias", new CategoryController().exibirTodasCategorias);
routes.put("/categorias/:id", new CategoryController().alterarCategorias);
routes.delete("/categorias/:id", new CategoryController().apagarCategorias);

export { routes };
