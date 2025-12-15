import { useAppSelector } from "../../../hooks/reduxHook";
import { SmallBookCard } from "../SmallBookCard/SmallBookCard";
import styles from "./SearchResults.module.scss";

export function SearchResults() {
  const searchedBooks = useAppSelector(state => state.booksSearchReducer);

  return (
    <div className={styles.wrp}>
      <header className={styles.header}>Найдено: {searchedBooks.length} книг(и)</header>
      <div className={styles.books}>
        {searchedBooks.map(book => {
            return (
              <SmallBookCard
                key={book.id}
                width={405}
                title={book.title}
                author={book.author}
                library={book.libraryId}
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