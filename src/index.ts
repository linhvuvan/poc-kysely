import { Kysely, PostgresDialect, Generated, Insertable } from 'kysely';
import { Pool } from 'pg';

type BookTable = {
  bookId: Generated<number>;
  title: string;
  author: string | null;
};

type Database = {
  book: BookTable;
};

type Book = {
  bookId: number;
  title: string;
  author?: string;
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
  insert: async (book: Insertable<BookTable>): Promise<void> => {
    await db.insertInto('book').values(book).execute();
  },
  findAll: async (): Promise<Book[]> => {
    const books = await db.selectFrom('book').selectAll().execute();

    return books.map((book) => ({
      ...book,
      author: book.author || undefined,
    }));
  },
  deleteAll: async (): Promise<void> => {
    await db.deleteFrom('book').execute();
  },
};

(async () => {
  await BookRepo.deleteAll();

  const newBook = { title: 'Moby Dick', author: 'Herman' };
  await BookRepo.insert(newBook);

  const books = await BookRepo.findAll();

  console.log('books', books);
})();
