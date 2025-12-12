import { Link } from "react-router";
import styles from "./FindBook.module.scss";

import { useState } from "react";
import { CustomCalendar, type Value } from "../UI/Calendar/CustomCalendar";

export function FindBook() {
  const [startBookRent, setStartBookRent] = useState<Value>(new Date());

  return (
    <div>
      <form>
        <label htmlFor="find-book_name">Название</label>
        <input id="find-book_name" type="text" />
        <label htmlFor="">Автор</label>
        <input id="find-author" type="text" />
        <label htmlFor="">Выдача книги</label>
        <input
          type="text"
          disabled
          value={startBookRent?.toLocaleString("ru-RU", {
            year: "numeric",
            month: "numeric",
            day: "2-digit",
          })}
        />
        <CustomCalendar value={startBookRent} onChange={setStartBookRent} />
        <button type="button">Найти книгу</button>
      </form>
    </div>
  );
}