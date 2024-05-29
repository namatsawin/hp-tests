import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { TodoCreationDTO, TodoUpdateDTO } from '../dtos/todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}
  
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Query('search') search: string) {
      return this.todoService.findAll(search);
    }
  
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: number): Todo {
      return this.todoService.findOne(+id);
    }
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() todo: TodoCreationDTO): Todo {
      return this.todoService.create(todo);
    }
  
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() updatedTodo: TodoUpdateDTO): Todo {
      return this.todoService.update(+id, updatedTodo);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: number): void {
      this.todoService.remove(+id);
    }
}
