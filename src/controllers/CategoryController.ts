import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repositories/CategoryRepository";

export class CategoryController {
  async salvar(req: Request, res: Response) {
    const { name, description } = req.body;

    const categoryRepository = getCustomRepository(CategoryRepository);

    const result = await categoryRepository.save({ name, description });

    if (result instanceof Error) return res.status(400).json(result.message);

    return res.status(201).json(result);
  }

  async exibirTodasCategorias(req: Request, res: Response) {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const result = await categoryRepository.getAll();

    if (result instanceof Error) return res.status(404).json(result);

    return res.json(result);
  }

  async alterarCategorias(req: Request, res: Response) {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const id = parseInt(req.params.id);

    const { name, description } = req.body;

    const result = await categoryRepository.update({
      id,
      name,
      description,
    });

    if (result instanceof Error) res.status(404).json(result.message);

    return res.json(result);
  }

  async apagarCategorias(req: Request, res: Response) {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const id = parseInt(req.params.id);

    const result = await categoryRepository.delete(id);

    if (result instanceof Error) res.status(404).json(result.message);

    return res.status(204).end();
  }
}
