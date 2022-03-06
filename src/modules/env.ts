import { object, string } from 'yup';

const schema = object().shape({
  NODE_ENV: string().default('production'),
  LOG_LEVEL: string().default('info'),
  DB_URI: string().required(),
  CORS_ORIGIN: string().required(),
});

const values = schema.validateSync(process.env, { stripUnknown: true });

export default values;
