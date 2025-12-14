import { Link } from "react-router";
import styles from "./EditorsChoice.module.scss";
import { useEffect, useState } from "react";
import { getEditorsChoiceBooks } from "../../../api/books";
import { BookCard } from "../../BookCard/BookCard";

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

  async function getChoosedBooks() {
    const booksFromApi = await getEditorsChoiceBooks();
    setBooks(booksFromApi);
  }

  useEffect(() => {
    getChoosedBooks()
  }, [])

  return (
    <div className={styles.wrp}>
      <header className={styles.header}>Выбор редакции</header>
      <div className={styles.books}>
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
    </div>
  );
}