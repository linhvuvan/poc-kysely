import { BookRepo } from './book.repo';

(async () => {
  await BookRepo.deleteAll();

  await BookRepo.insert({ title: 'Moby Dick', author: 'Herman' });

  const books = await BookRepo.findAll();

  console.log('books', books);
})();
