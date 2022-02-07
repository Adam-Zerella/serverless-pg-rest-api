import { Knex } from 'knex';

import { TABLES } from '@module/db/constants';

const triggerName = 'on_update_user';
const fnName = 'record_user_action';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
CREATE OR REPLACE FUNCTION ${fnName}() RETURNS trigger AS $$
  BEGIN
    IF TG_OP = 'INSERT'
    THEN
      INSERT INTO ${TABLES.TODO_HISTORY} (type, after)
      VALUES (TG_OP, row_to_json(NEW));
      RETURN NEW;
    ELSIF TG_OP = 'UPDATE'
    THEN
      INSERT INTO ${TABLES.TODO_HISTORY} (type, before, after)
      VALUES (TG_OP, row_to_json(OLD), row_to_json(NEW));
      RETURN NEW;
    ELSIF TG_OP = 'DELETE'
    THEN
      INSERT INTO ${TABLES.TODO_HISTORY} (type, before)
      VALUES (TG_OP, row_to_json(OLD));
      RETURN OLD;
    END IF;
  END;
$$ LANGUAGE plpgsql;
`);

  await knex.schema.raw(`
CREATE TRIGGER ${triggerName} BEFORE INSERT OR UPDATE OR DELETE ON "${TABLES.TODO}"
FOR EACH ROW EXECUTE FUNCTION ${fnName}();
`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(
    `DROP TRIGGER IF EXISTS ${triggerName} ON "${TABLES.TODO}"`,
  );

  await knex.schema.raw(`DROP FUNCTION IF EXISTS ${fnName}`);
}
