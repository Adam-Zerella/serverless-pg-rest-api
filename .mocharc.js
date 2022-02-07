'use strict';

// This is a JavaScript-based config file containing every Mocha option plus others.
// If you need conditional logic, you might want to use this type of config,
// e.g. set options via environment variables 'process.env'.
// Otherwise, JSON or YAML is recommended.

module.exports = {
  extension: ['ts'],
  reporter: 'spec',
  require: ['ts-node/register', 'test/fakeEnv.ts'],
  spec: ['**/__test__/**/*.test.ts'], // the positional arguments!
  timeout: '2000', // same as "timeout: '2s'"
};
