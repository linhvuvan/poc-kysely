import { sql } from 'kysely';
import { BOOK_TABLE_NAME, InsertableBookTable, db } from './db';
import { Book } from '.';

export const BookRepo = {
  insert: async (book: InsertableBookTable): Promise<void> => {
    await db.insertInto(BOOK_TABLE_NAME).values(book).execute();
  },
  findAll: async (): Promise<Book[]> => {
    const books = await db.selectFrom(BOOK_TABLE_NAME).selectAll().execute();

    return books;
  },
  deleteAll: async (): Promise<void> => {
    await sql`delete from book`.execute(db);
  },
  findById: (bookId: Book['bookId']): Promise<Book | undefined> => {
    return db
      .selectFrom(BOOK_TABLE_NAME)
      .selectAll()
      .where('bookId', '=', bookId)
      .executeTakeFirst();
  },
};
