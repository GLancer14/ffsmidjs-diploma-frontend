import styles from "./EditorsChoice.module.scss";
import { useEffect, useRef, useState } from "react";
import { getEditorsChoiceBooks } from "../../../api/books";
import { BookCard } from "../../BookCard/BookCard";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export interface Book {
  title: string;
  description?: string;
  libraryId: number;
  author: string;
  year?: number;
  totalCopies: number;
  id: number;
  coverImage?: string;
  isAvailable: boolean;
  availableCopies: number;
}

export function EditorsChoice() {
  const [books, setBooks] = useState<Book[]>([]);
  const booksRef = useRef(null);

  async function getChoosedBooks() {
    const booksFromApi = await getEditorsChoiceBooks();
    setBooks(booksFromApi);
  }

  function handleScrollRight(element: any) {
    element.scrollBy({
      left: -547,
      behavior: "smooth",
    })
  }

  function handleScrollLeft(element: any) {
    element.scrollBy({
      left: 547,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    getChoosedBooks()
  }, [])

  return (
    <div className={styles.wrp}>
      <header className={styles.header}>Выбор редакции</header>
      <div className={styles.books} ref={booksRef}>
        {books.map(book => {
          return (
            <BookCard
              title={book.title}
              author={book.author}
              library={book.libraryId}
              cover={book.coverImage}
              year={book.year}
              description={book.description}
            />
          );
        })}
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.forward}
          onClick={() => {
            handleScrollRight(booksRef.current)
          }}
        >
          <ArrowBigLeft 
            className={styles.icon}
            size={24}
          />
        </button>
        <button 
          className={styles.backward}
          onClick={() => {
            handleScrollLeft(booksRef.current)
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