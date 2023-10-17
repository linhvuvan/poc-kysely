import { BookRepo } from './book.repo';

export type Book = {
  bookId: number;
  title: string;
  author?: string;
  createdAt: Date;
};

(async () => {
  await BookRepo.deleteAll();

  await BookRepo.insert({ title: 'Moby Dick', createdAt: new Date() });

  const books = await BookRepo.findAll();

  console.log('books', books);

  const [firstBook] = books;

  console.log('first book', firstBook);
})();
