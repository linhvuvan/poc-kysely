import { BookRepo } from './book.repo';

(async () => {
  await BookRepo.deleteAll();

  const newBook = { title: 'Moby Dick', author: 'Herman' };
  await BookRepo.insert(newBook);

  const books = await BookRepo.findAll();

  console.log('books', books);
})();
