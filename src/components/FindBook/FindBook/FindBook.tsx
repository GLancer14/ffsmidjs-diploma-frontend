import { useLocation, useNavigate } from "react-router";
import styles from "./FindBook.module.scss";
import { useContext, useState } from "react";
import stackOfBooks from "../../../assets/stack-of-books-2.svg";
import books2 from "../../../assets/books-2.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { findBooks } from "../../../api/libraries";
import { updateFoundBooks } from "../../../store/reducers/booksSearchSlice";
import { RentRange } from "../../RentRange/RentRange";
import { parseRuDate } from "../../../utils/parseRuDate";
import { AlertContext } from "../../../context/AlertContext";

export function FindBook() {
  const dispatch = useAppDispatch();
  const searchedBooksAtStore = useAppSelector(state => state.booksSearchReducer);
  const location = useLocation();
  const navigation = useNavigate();
  const { showAlert } = useContext(AlertContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedRuDates = [
      parseRuDate(e.currentTarget.elements["find-book_start-rent"].value),
      parseRuDate(e.currentTarget.elements["find-book_end-rent"].value),
    ];

    const searchedBooks = await findBooks(title, author, parsedRuDates[0], parsedRuDates[1]);

    if (searchedBooks.status === "fail") {
      console.log(searchedBooks)
      showAlert!(searchedBooks.data)
    }
    dispatch(updateFoundBooks(searchedBooks));
    navigation("/find-book");
  }

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
        <RentRange />
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