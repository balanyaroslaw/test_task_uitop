import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TodosRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.todo.findMany();
  }

  async findAllByCategory(categoryId: number) {
    return this.prismaService.todo.findMany({
      where: {
        categoryId,
      },
    });
  }

  async findOne(id: string) {
    return this.prismaService.todo.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(text: string, categoryId: number, status: boolean) {
    return this.prismaService.todo.create({
      data: {
        text,
        categoryId,
        status,
      },
    });
  }

  async update(id: string, text: string, categoryId: number, status: boolean) {
    return this.prismaService.todo.update({
      where: {
        id: id,
      },
      data: {
        text,
        categoryId,
        status,
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.todo.delete({
      where: {
        id: id,
      },
    });
  }

  async getCountOfTodosByCategory(categoryId: number) {
    return this.prismaService.todo.count({
      where: {
        categoryId,
      },
    });
  }
}