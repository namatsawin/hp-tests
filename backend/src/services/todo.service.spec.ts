import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { NotFoundException } from '@nestjs/common';
import { TodoCreationDTO, TodoUpdateDTO } from '../dtos/todo.dto';
import { Todo } from '../models/todo.model';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  describe('findAll', () => {
    it('should return all todos when no search term is provided', async () => {
      const todos = [
        new Todo(1, 'Test Todo 1', 'Description 1'),
        new Todo(2, 'Test Todo 2', 'Description 2'),
      ];
      service['todos'] = todos;

      const result = await service.findAll('');
      expect(result).toEqual(todos);
    });

    it('should return filtered todos when a search term is provided', async () => {
      const todos = [
        new Todo(1, 'Test Todo 1', 'Description 1'),
        new Todo(2, 'Another Todo', 'Description 2'),
      ];
      service['todos'] = todos;

      const result = await service.findAll('Another');
      expect(result).toEqual([todos[1]]);
    });
  });

  describe('findOne', () => {
    it('should return a todo when a valid ID is provided', () => {
      const todo = new Todo(1, 'Test Todo', 'Description');
      service['todos'] = [todo];

      const result = service.findOne(1);
      expect(result).toEqual(todo);
    });

    it('should throw NotFoundException when an invalid ID is provided', () => {
      const exception = new NotFoundException('The todo could not be found.')
      expect(() => service.findOne(999)).toThrow(exception);
    });
  });

  describe('create', () => {
    it('should create a new todo', () => {
      const todoCreationDTO: TodoCreationDTO = {
        title: 'New Todo',
        description: 'New Description',
      };

      const result = service.create(todoCreationDTO);
      expect(result).toEqual(expect.objectContaining(todoCreationDTO));
      expect(service['todos']).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update an existing todo', () => {
      const todo = new Todo(1, 'Test Todo', 'Description');
      service['todos'] = [todo];

      const updateDTO: TodoUpdateDTO = { title: 'Updated Todo' };
      const result = service.update(1, updateDTO);
      expect(result.title).toEqual('Updated Todo');
    });

    it('should throw NotFoundException when trying to update a non-existent todo', () => {
      const updateDTO: TodoUpdateDTO = { title: 'Updated Todo' };
      const exception = new NotFoundException('The todo could not be found.')
      expect(() => service.update(999, updateDTO)).toThrow(exception);
    });
  });

  describe('remove', () => {
    it('should remove an existing todo', () => {
      const todo = new Todo(1, 'Test Todo', 'Description');
      service['todos'] = [todo];
      service.remove(1);
      expect(service['todos']).toHaveLength(0);
    });

    it('should not throw when trying to remove a non-existent todo', () => {
      service.remove(999);
      expect(service['todos']).toHaveLength(0);
    });
  });
});
