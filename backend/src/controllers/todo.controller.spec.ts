import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { TodoCreationDTO, TodoUpdateDTO } from '../dtos/todo.dto';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn(), 
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const result = [
        new Todo(1, 'Test Todo 1', 'Description 1'),
        new Todo(2, 'Test Todo 2', 'Description 2'),
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll('')).toBe(result);
      expect(service.findAll).toHaveBeenCalledWith('');
    });

    it('should return filtered todos based on search query', async () => {
      const result = [
        new Todo(1, 'Test Todo 1', 'Description 1'),
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll('Test')).toBe(result);
      expect(service.findAll).toHaveBeenCalledWith('Test');
    });
  });

  describe('findOne', () => {
    it('should return a single todo by ID', async () => {
      const result = new Todo(1, 'Test Todo', 'Description');
      jest.spyOn(service, 'findOne').mockReturnValue(result);

      expect(await controller.findOne(1)).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if todo is not found', () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => {
        throw new NotFoundException('The todo could not be found.');
      });

      expect(() => controller.findOne(999)).toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const todoCreationDTO: TodoCreationDTO = {
        title: 'New Todo',
        description: 'New Description',
      };
      const result = new Todo(1, 'New Todo', 'New Description');
      jest.spyOn(service, 'create').mockReturnValue(result);

      expect(await controller.create(todoCreationDTO)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(todoCreationDTO);
    });
  });

  describe('update', () => {
    it('should update an existing todo', async () => {
      const updateDTO: TodoUpdateDTO = { title: 'Updated Todo' };
      const result = new Todo(1, 'Updated Todo', 'Description');
      jest.spyOn(service, 'update').mockReturnValue(result);

      expect(await controller.update(1, updateDTO)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, updateDTO);
    });

    it('should throw NotFoundException if todo to update is not found', () => {
      const updateDTO: TodoUpdateDTO = { title: 'Updated Todo' };
      jest.spyOn(service, 'update').mockImplementation(() => {
        throw new NotFoundException('The todo could not be found.');
      });

      expect(() => controller.update(999, updateDTO)).toThrow(NotFoundException);
      expect(service.update).toHaveBeenCalledWith(999, updateDTO);
    });
  });

  describe('remove', () => {
    it('should remove a todo by ID', async () => {
      jest.spyOn(service, 'remove').mockReturnValue(undefined);

      expect(await controller.remove(1)).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
