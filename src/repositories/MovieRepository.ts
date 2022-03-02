import { EntityManager, EntityRepository, Repository } from "typeorm";
import { Category } from "../models/Category";
import { Movie } from "../models/Movie";

type MovieRequest = {
  name: string;
  description: string;
  duration: number;
  category_id: number;
};

type MovieUpdateRequest = {
  id: number;
  name: string;
  description: string;
  duration: number;
  category_id: number;
};

@EntityRepository()
export class MovieRepository {
  constructor(private manager: EntityManager) {}

  async save({
    name,
    description,
    duration,
    category_id,
  }: MovieRequest): Promise<Movie | Error> {
    const movie = new Movie();

    if (!(await this.manager.findOne(Category, category_id)))
      return new Error("Categoria inexistente!");

    if (await this.manager.findOne(Movie, { name }))
      return new Error("Filme já foi cadastrado!");

    movie.name = name;
    movie.description = description;
    movie.duration = duration;
    movie.category_id = category_id;

    return this.manager.save(movie);
  }

  async getAll(): Promise<Array<Movie> | Error> {
    const movies = await this.manager.find(Movie, {
      relations: ["category"],
    });

    if (movies.length === 0) return new Error("Não há cadastros de filmes!");

    return movies;
  }

  async getOne(id: number): Promise<Movie | Error> {
    const movie = await this.manager.findOne(Movie, id, {
      relations: ["category"],
    });

    if (!movie) return new Error("Não foi encontrado a categoria!");

    return movie;
  }

  async update({
    id,
    name,
    description,
    duration,
    category_id,
  }: MovieUpdateRequest): Promise<Movie | Error> {
    const oldMovie = await this.manager.findOne(Movie, id);

    if (!oldMovie) return Error("Filme selecionado não encontrado!");

    oldMovie.name = name ? name : oldMovie.name;
    oldMovie.description = description ? description : oldMovie.description;
    oldMovie.duration = duration ? duration : oldMovie.duration;
    oldMovie.category_id = category_id ? category_id : oldMovie.category_id;

    return await this.manager.save(oldMovie);
  }

  async delete(id: number) {
    if (!(await this.manager.findOne(Movie, id)))
      return new Error("Não foi possível encontrar a categoria selecionada");

    await this.manager.delete(Movie, id);
  }
}
