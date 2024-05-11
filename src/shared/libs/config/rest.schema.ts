import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
};

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Порт входящих соединений',
    format: 'port',
    env: 'PORT',
    default: 3005,
  },
  SALT: {
    doc: 'Salt для хеширования паролей',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP адресс базы данных (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: null,

  },
});
