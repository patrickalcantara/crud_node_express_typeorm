import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { MovieRepository } from "../repositories/MovieRepository";

export class MovieController {
  async create(req: Request, res: Response) {
    const { name, description, duration, category_id } = req.body;

    const movieRepository = getCustomRepository(MovieRepository);

    const result = await movieRepository.save({
      name,
      description,
      duration,
      category_id,
    });

    if (result instanceof Error) return res.status(400).json(result.message);

    return res.status(201).json(result);
  }

  async read(req: Request, res: Response) {
    const movieRepository = getCustomRepository(MovieRepository);

    const result = await movieRepository.getAll();

    if (result instanceof Error) return res.status(404).json(result.message);

    return res.json(result);
  }

  async update(req: Request, res: Response) {
    const movieRepository = getCustomRepository(MovieRepository);

    const id = parseInt(req.params.id);

    const { name, description, duration, category_id } = req.body;

    const result = await movieRepository.update({
      id,
      name,
      description,
      duration,
      category_id,
    });

    if (result instanceof Error) res.status(404).json(result.message);

    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    const movieRepository = getCustomRepository(MovieRepository);

    const id = parseInt(req.params.id);

    const result = await movieRepository.delete(id);

    if (result instanceof Error) res.status(404).json(result.message);

    return res.status(204).end();
  }
}
