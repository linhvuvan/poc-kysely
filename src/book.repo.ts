import { sql } from 'kysely';
import { BOOK_TABLE_NAME, InsertableBook, db } from './db';

type Book = {
  bookId: number;
  title: string;
  author?: string;
};

export const BookRepo = {
  insert: async (book: InsertableBook): Promise<void> => {
    await db.insertInto(BOOK_TABLE_NAME).values(book).execute();
  },
  findAll: async (): Promise<Book[]> => {
    const books = await db.selectFrom(BOOK_TABLE_NAME).selectAll().execute();

    return books.map((book) => ({
      ...book,
      author: book.author || undefined,
    }));
  },
  deleteAll: async (): Promise<void> => {
    await sql`delete from book`.execute(db);
  },
};
