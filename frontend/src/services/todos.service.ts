import type { CreateTodoDTO, GetTodoDTO } from "../dto/todo.dto";
import { Service } from "./service";

class TodosService extends Service {

  async getTodos(): Promise<GetTodoDTO[]> {
    return await this.fetch('todos/');
  }

  async getTodosByCategory(categoryId: number): Promise<GetTodoDTO[]> {
    return await this.fetch(`todos/category/${categoryId}`);
  }

  async getTodoById(id: string): Promise<GetTodoDTO> {
    return await this.fetch(`todos/${id}`);
  }

  async createTodo(todo: CreateTodoDTO) {
    const response = await this.fetch('todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return response;
  }

  async updateTodo(id: string, todo: Partial<CreateTodoDTO>) {
    const response = await this.fetch(`todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return response;
  }

  async deleteTodo(id: string) {
    await this.fetch(`todos/${id}`, {
      method: 'DELETE',
    });
  }
}

export const todosService = new TodosService();