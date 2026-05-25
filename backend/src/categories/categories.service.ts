import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService implements OnModuleInit {

  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAll() {
    return this.categoriesRepository.findAll();
  }

  onModuleInit() {
    this.setCategories();
  }

  async setCategories() {
    await this.categoriesRepository.setCategories();
  }
}
