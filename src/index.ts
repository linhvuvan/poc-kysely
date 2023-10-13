import { Kysely, PostgresDialect, Generated, QueryCreator } from 'kysely';
import { Pool } from 'pg';

type BookTable = {
  bookId: Generated<number>;
  title: string;
  author: string;
};

type Database = {
  book: BookTable;
};

type Book = {
  bookId: number;
  title: string;
  author: string;
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

const BookRepo = {
  insert: async (book: Book): Promise<void> => {
    await db.insertInto('book').values(book).execute();
  },
  findAll: async (): Promise<Book[]> => {
    const books = await db.selectFrom('book').selectAll().execute();

    return books;
  },
};

(async () => {
  await db.deleteFrom('book').execute();

  await BookRepo.insert({ bookId: 1, title: 'Moby Dick', author: 'Herman' });

  const books = await BookRepo.findAll();

  console.log('books', books);
})();
