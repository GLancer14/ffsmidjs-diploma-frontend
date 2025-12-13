import { Link } from "react-router";
import styles from "./FindBook.module.scss";
import { useState } from "react";
import { CustomCalendar, type Value } from "../UI/Calendar/CustomCalendar";
import stackOfBooks from "../../assets/stack-of-books-2.svg";

export function FindBook() {
  const [startRentCalendarVisiblility, setStartRentCalendarVisiblility] = useState(false);
  const [endRentCalendarVisiblility, setEndRentCalendarVisiblility] = useState(false);
  const [startBookRent, setStartBookRent] = useState<Value>(new Date());
  const [endBookRent, setEndBookRent] = useState<Value>(new Date());

  return (
    <div className={styles.wrp}>
      <form className={styles.form}>
        <label className={styles.nameLabel} htmlFor="find-book_name">Название</label>
        <input className={styles.name} id="find-book_name" type="text" placeholder="Например, Евгений Онегин" />
        <label className={styles.authorLabel} htmlFor="">Автор</label>
        <input className={styles.author} id="find-book_author" type="text" placeholder="Например, Пушкин А.С." />
        
        <div className={styles.rentDatesWrp}>
          <div className={styles.startRentWrp}>
            <label className={styles.startRentWrpLabel} htmlFor="find-book_start-rent">Выдача книги</label>
            <input
              className={styles.startRent}
              id="find-book_start-rent"
              type="text"
              value={startBookRent?.toLocaleString("ru-RU", {
                year: "numeric",
                month: "numeric",
                day: "2-digit",
              })}
              onClick={() => {
                setStartRentCalendarVisiblility(true)
              }}
            />
            <CustomCalendar
              value={startBookRent}
              visibility={startRentCalendarVisiblility}
              onChange={setStartBookRent}
              onVisibilityChange={setStartRentCalendarVisiblility}
            />
          </div>
          <div className={styles.endRentWrp}>
            <label className={styles.endRentWrpLabel} htmlFor="find-book_end-rent">Возврат книги</label>
            <input 
              className={styles.endRent}
              id="find-book_end-rent"
              type="text"
              value={endBookRent?.toLocaleString("ru-RU", {
                year: "numeric",
                month: "numeric",
                day: "2-digit",
              })}
              onClick={() => {
                setEndRentCalendarVisiblility(true)
              }}
            />
            <CustomCalendar
              value={endBookRent}
              visibility={endRentCalendarVisiblility}
              onChange={setEndBookRent}
              onVisibilityChange={setEndRentCalendarVisiblility}
            />
          </div>
        </div>
        <button className={styles.findBtn} type="button">Найти книгу</button>
      </form>
      <img className={styles.booksStack} src={stackOfBooks} alt="Стопка книг" />
    </div>
  );
}