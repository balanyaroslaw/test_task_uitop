import { Body, Controller, Delete, Get, Patch, Post, Param, ParseIntPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import * as todoDto from './dto/todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get('category/:categoryId')
  findAllByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.todosService.findAllByCategory(categoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Post()
  create(@Body() createTodoDto: todoDto.CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: todoDto.CreateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }


}
