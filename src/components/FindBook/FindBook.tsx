import { Link, useLocation, useNavigate } from "react-router";
import styles from "./FindBook.module.scss";
import { useEffect, useState } from "react";
import { CustomCalendar, type Value } from "../UI/Calendar/CustomCalendar";
import stackOfBooks from "../../assets/stack-of-books-2.svg";
import books2 from "../../assets/books-2.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { findBooks } from "../../api/books";
import { updateFoundBooks } from "../../store/reducers/booksSearchSlice";

export function FindBook() {
  const dispatch = useAppDispatch();
  const searchedBooksAtStore = useAppSelector(state => state.booksSearchReducer);
  const location = useLocation();
  const navigation = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [startRentCalendarVisiblility, setStartRentCalendarVisiblility] = useState(false);
  const [endRentCalendarVisiblility, setEndRentCalendarVisiblility] = useState(false);
  const [startBookRent, setStartBookRent] = useState("");
  const [startBookRentFormCalendar, setStartBookRentFormCalendar] = useState<Value>(null);
  const [endBookRent, setEndBookRent] = useState("");
  const [endBookRentFormCalendar, setEndBookRentFormCalendar] = useState<Value>(null);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const searchedBooks = await findBooks(title, author);
    dispatch(updateFoundBooks(searchedBooks));
    navigation("/find-book");
  }

  useEffect(() => {
    const stringFromCalendarDate = startBookRentFormCalendar?.toLocaleString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (stringFromCalendarDate) {
      setStartBookRent(stringFromCalendarDate);
    }
  }, [startBookRentFormCalendar]);

  useEffect(() => {
    const stringFromCalendarDate = endBookRentFormCalendar?.toLocaleString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (stringFromCalendarDate) {
      setEndBookRent(stringFromCalendarDate);
    }
  }, [endBookRentFormCalendar]);

  return (
    <div className={styles.wrp}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label className={styles.nameLabel} htmlFor="find-book_name">Название</label>
        <input
          className={styles.name}
          id="find-book_name"
          name="find-book_name"
          value={title}
          type="text"
          placeholder="Например, Евгений Онегин"
          onInput={(e) => setTitle(e.currentTarget.value)}
        />
        <label className={styles.authorLabel} htmlFor="">Автор</label>
        <input
          className={styles.author}
          id="find-book_author"
          name="find-book_author"
          value={author}
          type="text"
          placeholder="Например, Пушкин А.С."
          onInput={(e) => setAuthor(e.currentTarget.value)}
        />
        <div className={styles.rentDatesWrp}>
          <div className={styles.startRentWrp}>
            <label className={styles.startRentWrpLabel} htmlFor="find-book_start-rent">Выдача книги</label>
            <input
              className={styles.startRent}
              id="find-book_start-rent"
              name="find-book_start-rent"
              type="text"
              value={startBookRent}
              placeholder="Выберите дату"
              onClick={() => {
                setStartRentCalendarVisiblility(true)
              }}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                setStartBookRent(e.currentTarget.value);
                setStartRentCalendarVisiblility(false);
              }}
            />
            <CustomCalendar
              value={startBookRentFormCalendar}
              visibility={startRentCalendarVisiblility}
              onChange={setStartBookRentFormCalendar}
              onVisibilityChange={setStartRentCalendarVisiblility}
            />
          </div>
          <div className={styles.endRentWrp}>
            <label className={styles.endRentWrpLabel} htmlFor="find-book_end-rent">Возврат книги</label>
            <input 
              className={styles.endRent}
              id="find-book_end-rent"
              name="find-book_end-rent"
              type="text"
              value={endBookRent}
              placeholder="Выберите дату"
              onClick={() => {
                setEndRentCalendarVisiblility(true)
              }}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                setEndBookRent(e.currentTarget.value);
                setEndRentCalendarVisiblility(false);
              }}
            />
            <CustomCalendar
              value={endBookRentFormCalendar}
              visibility={endRentCalendarVisiblility}
              onChange={setEndBookRentFormCalendar}
              onVisibilityChange={setEndRentCalendarVisiblility}
            />
          </div>
        </div>
        <button className={styles.findBtn}>
          Найти книгу
        </button>
      </form>
      {location.pathname !== "/find-book"
        ? <img className={styles.booksStack} src={stackOfBooks} alt="Стопка книг" />
        : <img className={styles.booksStack} src={books2} alt="раскрытая книга" />
      }
      
    </div>
  );
}