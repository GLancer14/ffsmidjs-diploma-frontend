
import { useNavigate, useParams } from "react-router";
import styles from "./RentOrder.module.scss";
import { useEffect, useState } from "react";
import { getBookById, getLibraryById } from "../../../api/libraries";
import type { Book, Library } from "../../../types/library";
import { findBookRent } from "../../../api/bookRent";
import books from "../../../assets/books.svg";
import type { BookRent } from "../../../types/bookRent";
import {
  BookOpen,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { parseDateFromUTCToRu } from "../../../utils/parseRuDate";

export function RentOrder() {
  const params = useParams();
  const navigation = useNavigate();
  const [rentData, setRentData] = useState<BookRent | null>(null);
  const [libraryData, setLibraryData] = useState<Library | null>(null);
  const [rentedBookData, setRentedBookData] = useState<Book | null>(null);

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
      <div className={styles.contentWrp}>
        <img className={styles.illustration} src={books} alt="раскрытая книга" />
        <div className={styles.orderWrp}>
          <p className={styles.paragraph}>
            Книга будет ожидать вас в выбранной библиотеке.
          </p>
          <div className={styles.orderData}>
            <div className={styles.data}>
              <BookOpen className={styles.icon} />
              <div className={styles.text}>
                <span className={styles.bold}>{rentedBookData?.title} </span>
                /
                <span> {rentedBookData?.author}</span>
              </div>
            </div>
            <div className={styles.data}>
              <MapPin className={styles.icon} size={24} />
              <div className={styles.text}>
                <span className={styles.bold}>{libraryData?.name} </span>
                /
                <span> {libraryData?.address}</span>
              </div>
            </div>
            <div className={styles.data}>
              <CalendarDays className={styles.icon} />
              <div className={styles.text}>
                <span>Дата получения: </span>
                <span className={styles.bold}>{parseDateFromUTCToRu(rentData?.dateStart)} </span>
                /
                <span> Дата возврата: </span>
                <span className={styles.bold}> {parseDateFromUTCToRu(rentData?.dateEnd)}</span>
              </div>
            </div>
          </div>
          <p className={styles.paragraph}>
            Пожалуйста, заберите книгу в указанный срок. Если вы не успеете, бронь автоматически снимется
          </p>
          <div className={styles.btnsWrp}>
            <button
              className={styles.find}
              type="button"
              onClick={() => {
                navigation("/find-book");
              }}
            >
              Найти другую книгу
            </button>
            <button
              className={styles.rents}
              type="button"
              onClick={() => {
                navigation("/profile/my-books");
              }}
            >
              Мои бронирования
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}