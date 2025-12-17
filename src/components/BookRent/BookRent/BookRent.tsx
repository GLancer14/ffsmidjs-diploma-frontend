
import { useParams } from "react-router";
import styles from "./BookRent.module.scss";
import { useEffect, useState } from "react";
import { findBooks } from "../../../api/books";
import { BookCard } from "../../BookCard/BookCard";
import { BookCheck } from "lucide-react";
import type { Book } from "../../../types/books";
import { RentRange } from "../../RentRange/RentRange";

export function BookRent() {
  const params = useParams();
  const [booksData, setBookData] = useState<Book[] | null>(null);
  async function getBookData() {
    if (params.title && params.author) {
      const getBookData: Book[] = await findBooks(params.title, params.author);
      const filteredData = getBookData.filter(bookData => {
        return bookData.title === params.title;
      });
      setBookData(filteredData);
    }
  }

  useEffect(() => {
   getBookData();
  }, []);

  if (booksData) {
    return (
      <form className={styles.form}>
        <header className={styles.header}>Бронирование книги "{booksData[0].title}"</header>
        <div className={styles.card}>
          <BookCard
            id={booksData[0].id}
            key={booksData[0].id}
            type="rent"
            title={booksData[0].title}
            author={booksData[0].author}
            library={booksData[0].library[0].library.name}
            cover={booksData[0].coverImage}
            year={booksData[0].year}
            description={booksData[0].description}
          />
        </div>
        <div className={styles.libraries}>
          <header className={styles.header}>Выберите библиотеку</header>
          {booksData.map(bookData => {
            return (
              <>  
                <label className={styles.library}>
                  {bookData.library[0].isAvailable && 
                    <input className={styles.radio} type="radio" name="library" value={bookData.id} />
                  }
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
                </label>
              </>
              
            );
          })}
        </div>
        <div className={styles.dateRange}>
          <header className={styles.header}>Выберите период бронирования</header>
          <RentRange />
        </div>
        <button className={styles.submit}>Подтвердить бронирование</button>
      </form>
    );
  }
}