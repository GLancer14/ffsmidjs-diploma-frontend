import styles from "./RentRange.module.scss";
import { useEffect, useState } from "react";
import { CustomCalendar, type Value } from "../UI/Calendar/CustomCalendar";

export function RentRange() {
  const [startRentCalendarVisiblility, setStartRentCalendarVisiblility] = useState(false);
  const [endRentCalendarVisiblility, setEndRentCalendarVisiblility] = useState(false);
  const [startBookRent, setStartBookRent] = useState("");
  const [startBookRentFormCalendar, setStartBookRentFormCalendar] = useState<Value>(null);
  const [endBookRent, setEndBookRent] = useState("");
  const [endBookRentFormCalendar, setEndBookRentFormCalendar] = useState<Value>(null);

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
  );
}