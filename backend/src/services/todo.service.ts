import { Injectable, NotFoundException } from '@nestjs/common';

import { Todo } from '../models/todo.model';
import { TodoCreationDTO, TodoUpdateDTO } from '../dtos/todo.dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCount: number = 1;

  async findAll(search: string): Promise<Todo[]> {
    if (search) {
        return this.todos.filter(todo =>  {
                const isTitleMatched = todo.title?.toLowerCase().includes(search.toLowerCase())
                const isDescriptionMatched = todo.description?.toLowerCase().includes(search.toLowerCase())
                return isTitleMatched || isDescriptionMatched
            }
        );
    }

    return this.todos
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) throw new NotFoundException('The todo could not be found.')
    return todo
  }

  create(todo: TodoCreationDTO): Todo {
    const newTodo = new Todo(this.idCount++, todo.title, todo.description)
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updatedTodo: TodoUpdateDTO): Todo {
    const todo = this.findOne(id);

    if (!todo) throw new NotFoundException('The todo could not be found.')
    
    Object.assign(todo, updatedTodo)
    
    return todo;
  }

  remove(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
