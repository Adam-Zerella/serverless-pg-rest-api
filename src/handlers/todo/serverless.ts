import type { AWS } from '@serverless/typescript';

export const todoHandlers: AWS['functions'] = {
  findAllTodo: {
    handler: `src/handlers/todo/handlers.findAll`,
    description: 'List todos',
    architecture: 'arm64',
    events: [
      {
        httpApi: 'GET /todo',
      },
    ],
  },

  findOneTodo: {
    handler: `src/handlers/todo/handlers.findById`,
    description: 'Find todo by ID',
    architecture: 'arm64',
    events: [
      {
        httpApi: 'GET /todo/{todoId}',
      },
    ],
  },

  updateTodo: {
    handler: `src/handlers/todo/handlers.update`,
    description: 'Update todo',
    architecture: 'arm64',
    events: [
      {
        httpApi: 'PUT /todo/{todoId}',
      },
    ],
  },

  createTodo: {
    handler: `src/handlers/todo/handlers.create`,
    description: 'Create todo',
    architecture: 'arm64',
    events: [
      {
        httpApi: 'POST /todo',
      },
    ],
  },

  deleteTodo: {
    handler: `src/handlers/todo/handlers.delete`,
    description: 'Delete todo',
    architecture: 'arm64',
    events: [
      {
        httpApi: 'DELETE /todo',
      },
    ],
  },
};
