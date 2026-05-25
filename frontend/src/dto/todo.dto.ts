
export interface GetTodoDTO {
  id: number;
  text: string;
  categoryId: number;
  completed: boolean;
}

export interface CreateTodoDTO {
  text: string;
  categoryId: number;
  status: boolean;
}