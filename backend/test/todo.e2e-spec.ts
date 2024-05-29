import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TodoController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/todo (GET)', () => {
    return request(app.getHttpServer())
      .get('/todo')
      .expect(200)
      .expect([]);
  });

  it('/todo (POST)', async () => {
    const todo = { title: 'Test Todo', description: 'Test Description' };
    const response = await request(app.getHttpServer())
      .post('/todo')
      .send(todo)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toEqual(todo.title);
    expect(response.body.description).toEqual(todo.description);
  });

  it('/todo/:id (GET)', async () => {
    const todo = { title: 'Test Todo', description: 'Test Description' };
    const createResponse = await request(app.getHttpServer())
      .post('/todo')
      .send(todo)
      .expect(201);

    const todoId = createResponse.body.id;

    const getResponse = await request(app.getHttpServer())
      .get(`/todo/${todoId}`)
      .expect(200);

    expect(getResponse.body.id).toEqual(todoId);
    expect(getResponse.body.title).toEqual(todo.title);
    expect(getResponse.body.description).toEqual(todo.description);
  });

  it('/todo/:id (PATCH)', async () => {
    const todo = { title: 'Test Todo', description: 'Test Description' };
    const createResponse = await request(app.getHttpServer())
      .post('/todo')
      .send(todo)
      .expect(201);

    const todoId = createResponse.body.id;
    const updatedTodo = { title: 'Updated Todo', description: 'Updated Description' };

    const updateResponse = await request(app.getHttpServer())
      .patch(`/todo/${todoId}`)
      .send(updatedTodo)
      .expect(200);

    expect(updateResponse.body.id).toEqual(todoId);
    expect(updateResponse.body.title).toEqual(updatedTodo.title);
    expect(updateResponse.body.description).toEqual(updatedTodo.description);
  });

  it('/todo/:id (DELETE)', async () => {
    const todo = { title: 'Test Todo', description: 'Test Description' };
    const createResponse = await request(app.getHttpServer())
      .post('/todo')
      .send(todo)
      .expect(201);

    const todoId = createResponse.body.id;

    await request(app.getHttpServer())
      .delete(`/todo/${todoId}`)
      .expect(204);

    await request(app.getHttpServer())
      .get(`/todo/${todoId}`)
      .expect(404);
  });
});
