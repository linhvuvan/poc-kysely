import { Insertable, sql } from 'kysely';
import { BookTable, db } from './db';
import { Book } from '.';

export const BookRepo = {
  insert: async (book: Insertable<BookTable>): Promise<void> => {
    await db.insertInto('public.book').values(book).execute();
  },
  findAll: async (): Promise<Book[]> => {
    const books = await db.selectFrom('public.book').selectAll().execute();

    return books;
  },
  deleteAll: async (): Promise<void> => {
    await db.deleteFrom('public.book').execute();
  },
  findById: (bookId: Book['bookId']): Promise<Book | undefined> => {
    return db
      .selectFrom('public.book')
      .selectAll()
      .where('bookId', '=', bookId)
      .executeTakeFirst();
  },
  deleteById: async (bookId: Book['bookId']): Promise<Book | undefined> => {
    return db
      .deleteFrom('public.book')
      .where('bookId', '=', bookId)
      .returningAll()
      .executeTakeFirst();
  },
};
