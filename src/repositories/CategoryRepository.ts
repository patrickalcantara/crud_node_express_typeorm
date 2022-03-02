import { EntityManager, EntityRepository, Repository } from "typeorm";
import { Category } from "../models/Category";

type CategoryRequest = {
  name: string;
  description: string;
};

type CategoryUpdateRequest = {
  id: number;
  name: string;
  description: string;
};

@EntityRepository()
export class CategoryRepository {
  constructor(private manager: EntityManager) {}

  async save({
    name,
    description,
  }: CategoryRequest): Promise<Category | Error> {
    const category = new Category();

    if (await this.manager.findOne(Category, { name }))
      return new Error("Categoria já foi cadastrada!");

    category.name = name;
    category.description = description;

    return this.manager.save(category);
  }

  async getAll(): Promise<Array<Category> | Error> {
    const allCategories = await this.manager.find(Category);

    if (allCategories.length === 0)
      return new Error("Não há cadastros de categorias!");

    return allCategories;
  }

  async getOne(id: number): Promise<Category | Error> {
    const category = await this.manager.findOne(Category, { id });

    if (!category) return new Error("Não foi encontrado a categoria!");

    return category;
  }

  async update({
    id,
    name,
    description,
  }: CategoryUpdateRequest): Promise<Category | Error> {
    const oldCategory = await this.manager.findOne(Category, { id });

    if (!oldCategory) return Error("Categoria selecionada não encontrada!");

    oldCategory.name = name ? name : oldCategory.name;
    oldCategory.description = description
      ? description
      : oldCategory.description;

    return await this.manager.save(oldCategory);
  }

  async delete(id: number) {
    if (!(await this.manager.findOne(Category, { id })))
      return new Error("Não foi possível encontrar a categoria selecionada");

    await this.manager.delete(Category, { id });
  }
}
