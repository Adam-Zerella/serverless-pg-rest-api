import type { AWS } from '@serverless/typescript';

export const todoHandlers: AWS['functions'] = {
  findAllTodo: {
    handler: `src/handlers/todo/handlers.findAll`,
    description: 'List todos',
    architecture: 'arm64',
    events: [
      {
        http: {
          cors: true,
          // async: true,
          method: 'GET',
          path: '/todo',
        },
      },
    ],
  },

  findOneTodo: {
    handler: `src/handlers/todo/handlers.findById`,
    description: 'Find todo by ID',
    architecture: 'arm64',
    events: [
      {
        http: {
          cors: true,
          method: 'GET',
          path: '/todo/{todoId}',
        },
      },
    ],
  },

  updateTodo: {
    handler: `src/handlers/todo/handlers.update`,
    description: 'Update todo',
    architecture: 'arm64',
    events: [
      {
        http: {
          cors: true,
          method: 'PUT',
          path: '/todo/{todoId}',
        },
      },
    ],
  },

  createTodo: {
    handler: `src/handlers/todo/handlers.create`,
    description: 'Create todo',
    architecture: 'arm64',
    events: [
      {
        http: {
          cors: true,
          method: 'POST',
          path: '/todo',
        },
      },
    ],
  },

  deleteTodo: {
    handler: `src/handlers/todo/handlers.remove`,
    description: 'Delete todo',
    architecture: 'arm64',
    events: [
      {
        http: {
          cors: true,
          method: 'DELETE',
          path: '/todo/{todoId}',
        },
      },
    ],
  },
};
