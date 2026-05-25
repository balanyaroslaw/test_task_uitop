import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TodosRepository } from './todos.repository';
import { CreateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {

  constructor(private readonly todosRepository: TodosRepository) {}

  async findAll() {
    try {
      return await this.todosRepository.findAll();
    } catch (error) {
      console.error("Error fetching todos:", error);
      if (error instanceof HttpException) throw error;
      throw new HttpException("Failed to fetch todos", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllByCategory(categoryId: number) {
    try {
      return await this.todosRepository.findAllByCategory(categoryId);
    } catch (error) {
      console.error("Error fetching todos by category:", error);
      if (error instanceof HttpException) throw error;
      throw new HttpException("Failed to fetch todos by category", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const todo = await this.todosRepository.findOne(id);
      if (!todo) {
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
      }
      return todo;
    } catch (error) {
      console.error("Error fetching todo:", error);
      if (error instanceof HttpException) throw error;
      throw new HttpException("Failed to fetch todo", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(todo: CreateTodoDto) {
    try {
      const countOfCategories = await this.todosRepository.getCountOfTodosByCategory(todo.categoryId);
      if (countOfCategories >= 10) {
        throw new HttpException("Cannot create more than 10 todos in a category", HttpStatus.BAD_REQUEST);
      }
      return await this.todosRepository.create(todo.text, todo.categoryId, todo.status);
    } catch (error) {
      console.error("Error creating todo:", error);
      if (error instanceof HttpException) throw error;
      throw new HttpException("Failed to create todo", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, todo: CreateTodoDto) {
    try {
      return await this.todosRepository.update(id, todo.text, todo.categoryId, todo.status);
    } catch (error) {
      console.error("Error updating todo:", error);
      if (error instanceof HttpException) throw error;
      throw new HttpException("Failed to update todo", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      return await this.todosRepository.remove(id);
    } catch (error) {
      console.error("Error removing todo:", error);
      if (error instanceof HttpException) throw error;
      throw new HttpException("Failed to remove todo", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
