import { assert } from 'chai';
import { stub, restore as restoreSinon } from 'sinon';

import {
  list,
  insertOneOrThrow,
  updateOneOrThrow,
  deleteOneOrThrow,
  findOneOrThrow,
} from '../persistence';

import db from '@module/db/lib';
import ApiError from '@module/error';

import type { TodoQuery } from '../schemas';

export default function () {
  beforeEach(function () {
    restoreSinon();
  });

  describe('Persistence', async function () {
    describe('List', async function () {
      it('Should throw if the DB is not responding', async function () {
        const fakeQuery: TodoQuery = { page: 0, sort: 'asc' };

        stub(db, 'raw').throws();

        try {
          await list(fakeQuery);
        } catch (err) {
          assert.instanceOf<ApiError>(err, ApiError);
          assert.strictEqual(err.statusCode, 500);
        }
      });
    });

    describe('Find one', async function () {
      it('Should throw if the DB is not responding', async function () {
        stub(db, 'raw').throws();

        try {
          await findOneOrThrow('fake-param-id');
        } catch (err) {
          assert.instanceOf<ApiError>(err, ApiError);
          assert.strictEqual(err.statusCode, 500);
        }
      });
    });

    describe('Create', async function () {
      it('Should throw if the DB is not responding', async function () {
        stub(db, 'raw').throws();

        try {
          await insertOneOrThrow({});
        } catch (err) {
          assert.instanceOf<ApiError>(err, ApiError);
          assert.strictEqual(err.statusCode, 500);
        }
      });
    });

    describe('Update', async function () {
      it('Should throw if the DB is not responding', async function () {
        stub(db, 'raw').throws();

        try {
          await updateOneOrThrow('fake-param-id', {});
        } catch (err) {
          assert.instanceOf<ApiError>(err, ApiError);
          assert.strictEqual(err.statusCode, 500);
        }
      });
    });

    describe('Remove', async function () {
      it('Should throw if the DB is not responding', async function () {
        stub(db, 'raw').throws();

        try {
          await deleteOneOrThrow('fake-param-id');
        } catch (err) {
          assert.instanceOf<ApiError>(err, ApiError);
          assert.strictEqual(err.statusCode, 500);
        }
      });
    });
  });
}
