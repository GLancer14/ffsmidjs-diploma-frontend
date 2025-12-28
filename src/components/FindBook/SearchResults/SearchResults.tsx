import { useAppSelector } from "../../../hooks/reduxHook";
import type { Book } from "../../../types/library";
import { BookCard } from "../../BookCard/BookCard";
import styles from "./SearchResults.module.scss";

export function SearchResults() {
  const searchedBooks = useAppSelector(state => state.booksSearchReducer);
  // const searchedBooksUnited: Book[][] = [];
  // searchedBooks.forEach((book) => {
  //   const existingUnitedBookIndex = searchedBooksUnited.findIndex((unitedBook) => {
  //     return unitedBook[0].title === book.title && unitedBook[0].author === book.author;
  //   });

  //   if (existingUnitedBookIndex !== -1) {
  //     searchedBooksUnited[existingUnitedBookIndex].push(book);
  //   } else {
  //     searchedBooksUnited.push([book]);
  //   }
  // });

  return (
    <div className={styles.wrp}>
      <header className={styles.header}>Найдено: {searchedBooks.length} книг(и)</header>
      <div className={styles.books}>
        {searchedBooks.map(book => {
            console.log(book)
            // const book = book[0];
            return (
              <BookCard
                id={book.id}
                key={book.id}
                type="small"
                title={book.title}
                author={book.author}
                // library={book.library}
                librariesCount={book.library.length}
                cover={book.coverImage}
                year={book.year}
                description={book.description}
              />
            );
          })
        }
      </div>
    </div>
  );
}