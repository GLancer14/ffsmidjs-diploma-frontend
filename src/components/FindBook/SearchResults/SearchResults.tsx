import { useAppSelector } from "../../../hooks/reduxHook";
import { BookCard } from "../../BookCard/BookCard";
import styles from "./SearchResults.module.scss";

export function SearchResults() {
  const searchedBooks = useAppSelector(state => state.booksSearchReducer);

  return (
    <div className={styles.wrp}>
      <header className={styles.header}>Найдено: {searchedBooks.length} книг(и)</header>
      <div className={styles.books}>
        {searchedBooks.map(book => {
            return (
              <BookCard
                id={book.id}
                key={book.id}
                type="small"
                title={book.title}
                author={book.author}
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