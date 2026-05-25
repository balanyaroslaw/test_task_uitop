import type { GetCategoryDTO } from "../dto/category.dto";
import { Service } from "./service";

class CategoriesService extends Service {

  async getCategories(): Promise<GetCategoryDTO[]> {
    return await this.fetch('categories/');
  }
}

export const categoriesService = new CategoriesService();