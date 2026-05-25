import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DEFAULT_CATEGORIES } from "./dto/category.dto";

@Injectable()
export class CategoriesRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async findAll() {
    return this.prismaService.category.findMany();
  }

  async setCategories() {
    const count = await this.prismaService.category.count();
    if (count > 0) return;

    await this.prismaService.category.createMany({
      data: DEFAULT_CATEGORIES.map(name => ({ name })),
    });
  }
}