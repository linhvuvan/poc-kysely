import { Generated, Insertable, Kysely, PostgresDialect } from 'kysely';
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

export const BOOK_TABLE_NAME = 'public.book';

type Book = {
  bookId: Generated<number>;
  title: string;
  author: string | null;
};

type Database = {
  [BOOK_TABLE_NAME]: Book;
};

export type InsertableBook = Insertable<Book>;

export const db = new Kysely<Database>({
  dialect,
  log: console.log,
});
