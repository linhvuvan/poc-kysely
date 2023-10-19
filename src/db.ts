import { PostgresDialect, Kysely, Generated, Insertable } from 'kysely';
import { Pool } from 'pg';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'postgres',
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    port: 5001,
    max: 10,
  }),
});

export type BookTable = {
  bookId: Generated<number>;
  title: string;
  author: string | null;
  createdAt: Date;
};

type Database = {
  'public.book': BookTable;
};

export const db = new Kysely<Database>({
  dialect,
  // log: console.log,
});
