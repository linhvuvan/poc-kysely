import { Kysely, PostgresDialect, Generated, QueryCreator } from 'kysely';
import { Pool } from 'pg';

type BookTable = {
  book_id: Generated<number>;
  title: string;
  author: string;
};

type Database = {
  book: BookTable;
};

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

const db = new Kysely<Database>({
  dialect,
  log: console.log,
});

(async () => {
  await db.deleteFrom('book').execute();

  await db
    .insertInto('book')
    .values({ title: 'Moby Dick', author: 'Herman' })
    .execute();

  const books = await db
    .selectFrom('book')
    .selectAll()
    .where('title', '=', 'Moby Dick')
    .execute();

  console.log('books', books);
})();
