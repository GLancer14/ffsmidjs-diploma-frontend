import styles from "./EditorsChoice.module.scss";
import { useEffect, useRef, useState } from "react";
import { getEditorsChoiceBooks } from "../../../api/libraries";
import { BookCard } from "../../BookCard/BookCard";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import type { Book } from "../../../types/library";

export function EditorsChoice() {
  const [books, setBooks] = useState<Book[]>([]);
  const booksRef = useRef(null);

  async function getChoosedBooks() {
    const booksFromApi = await getEditorsChoiceBooks();
    setBooks(booksFromApi);
  }

  function handleScrollRight(element: any) {
    const elementChildWidth = parseInt(getComputedStyle(element.firstChild).width);
    element.scrollBy({
      left: elementChildWidth,
      behavior: "smooth",
    })
  }

  function handleScrollLeft(element: any) {
    const elementChildWidth = parseInt(getComputedStyle(element.firstChild).width);
    element.scrollBy({
      left: elementChildWidth * -1,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    getChoosedBooks();
  }, []);

  return (
    <div className={styles.wrp}>
      <header className={styles.header}>Выбор редакции</header>
      <div className={styles.books} ref={booksRef}>
        {books.map(book => {
          return (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              library={book.library[0].library.name}
              cover={book.coverImage}
              year={book.year}
              description={book.description}
            />
          );
        })}
      </div>
      <div className={styles.buttons}>
        <button 
          className={styles.backward}
          onClick={() => {
            handleScrollLeft(booksRef.current)
          }}
        >
          <ArrowBigLeft 
            className={styles.icon}
            size={24}
          />
        </button>
        <button
          className={styles.forward}
          onClick={() => {
            handleScrollRight(booksRef.current)
          }}
        >
          <ArrowBigRight 
            className={styles.icon}
            size={24}
          />
        </button>
      </div>
    </div>
  );
}