
import { useNavigate, useParams } from "react-router";
import styles from "./RentOrder.module.scss";
import { useEffect, useState } from "react";
import { findBooks, getBookById, getLibraryById } from "../../../api/books";
import type { Book } from "../../../types/library";
import { findBookRent, rentBook } from "../../../api/bookRent";
import { parseRuDate } from "../../../utils/parseRuDate";
import books from "../../../assets/books.svg";

export function RentOrder() {
  const params = useParams();
  const navigation = useNavigate();
  const [rentData, setRentData] = useState<Book[] | null>(null);
  const [libraryData, setLibraryData] = useState<number>(0);
  const [rentedBookData, setRentedBookData] = useState<any>(null);

  async function getRentedBookData() {
    if (params.id) {
      const newRentData = await findBookRent(params.id);
      if (newRentData.status !== "fail") {
        const bookData = await getBookById(newRentData.bookId);
        const libraryData = await getLibraryById(newRentData.libraryId);

        setRentedBookData(bookData);
        setLibraryData(libraryData);
        setRentData(newRentData);
      }
    }
  }

  useEffect(() => {
    getRentedBookData();
  }, []);

  return (
    <div className={styles.wrp}>
      <header className={styles.header}>Бронирование успешно оформлено!</header>
      <img src={books} alt="раскрытая книга" />
      <div className={styles.orderWrp}>
        <p className={styles.paragraph}>
          Книга будет ожидать вас в выбранной библиотеке.
        </p>
        <div className={styles.orderData}>
          <div className={styles.data}>
            <span className={styles.bold}>{rentedBookData}</span>
            <span></span>
          </div>
          <div className={styles.data}>
            <span className={styles.bold}></span>
            <span></span>
          </div>
          <div className={styles.data}>
            <span></span>
            <span className={styles.bold}></span>
            <span></span>
            <span className={styles.bold}></span>
          </div>
        </div>
        <p className={styles.paragraph}>
          Пожалуйста, заберите книгу в указанный срок. Если вы не успеете, броньавтоматически снимется
        </p>
      </div>
      <div className={styles.btnsWrp}>
        <button className={styles.find} type="button">Найти другую книгу</button>
        <button className={styles.rents} type="button">Мои бронирования</button>
      </div>
    </div>
  );
}