
import { useParams } from "react-router";
import styles from "./BookRent.module.scss";
import { useEffect, useState } from "react";
import { findBooks, getBookById } from "../../../api/books";
import { BookCard } from "../../BookCard/BookCard";
import { BookCheck } from "lucide-react";

export interface Book {
  id: number;
  title: string;
  author: string;
  year?: number;
  description?: string;
  coverImage?: string;
  library: BookOnLibrary[];
}

export interface BookOnLibrary {
  bookId: number;
  libraryId: number;
  totalCopies: number;
  availableCopies: number;
  isAvailable: boolean;
  library: {
    id: number;
    name: string;
    address: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }
}

export function BookRent() {
  const params = useParams();
  const [booksData, setBookData] = useState<Book[] | null>(null);
  async function getBookData() {
    if (params.title && params.author) {
      const getBookData = await findBooks(params.title, params.author);
      setBookData(getBookData);
    }
  }

  useEffect(() => {
   getBookData();
  }, []);

  console.log(booksData)

  if (booksData) {
    return (
      <div className={styles.wrp}>
        <header className={styles.header}>Бронирование книги "{booksData[0].title}"</header>
        <div className={styles.card}>
          <BookCard
            id={booksData[0].id}
            key={booksData[0].id}
            type="rent"
            title={booksData[0].title}
            author={booksData[0].author}
            library={booksData[0].library[0].libraryId}
            cover={booksData[0].coverImage}
            year={booksData[0].year}
            description={booksData[0].description}
          />
        </div>
        <div className={styles.libraries}>
          <header className={styles.header}>Выберите библиотеку</header>
          {booksData.map(bookData => {
            return (
              <div className={styles.library}>
                <div className={styles.text}>
                  <div className={styles.name}>{bookData.library[0].library.name}</div>
                  <div className={styles.address}>{bookData.library[0].library.address}</div>
                </div>
                <div className={styles.copiesWrp}>
                  <BookCheck size={24} />
                  <div className={styles.copies}>
                    <span>{bookData.library[0].availableCopies}</span>
                    /
                    <span>{bookData.library[0].totalCopies}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
}