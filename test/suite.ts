import './helpers/fakeEnv';

import todoPersistence from '@handler/todo/__tests__/persistence.test';
import todoHandlers from '@handler/todo/__tests__/handlers.test';

describe('Suite', function () {
  describe('Todo', async function () {
    todoPersistence();
    todoHandlers();
  });
});
