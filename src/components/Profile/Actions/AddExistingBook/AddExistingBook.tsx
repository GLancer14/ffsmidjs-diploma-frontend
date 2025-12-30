import {
  useContext,
  useState,
} from "react";
import styles from "./AddExistingBook.module.scss";
import classNames from "classnames";
import { ActionModalContext } from "../../../../context/ActionModalContext";
import { AlertContext } from "../../../../context/AlertContext";
import {
  Minus,
  Plus,
} from "lucide-react";
import { addExistingBook, findBooksByTitle } from "../../../../api/libraries";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import type { Book } from "../../../../types/library";
import { BookCard } from "../../../BookCard/BookCard";

export function AddExistingBook() {
  const dispatch = useAppDispatch();
  const { showAlert } = useContext(AlertContext);
  const { closeActionModal } = useContext(ActionModalContext);
  const observedLibraryProfile = useAppSelector(state => state.observedLibraryProfileReducer);
  const [copies, setCopies] = useState("1");
  const [selectedBookTitle, setSelectedBookTitle] = useState("");
  const [booksVisibility, setBooksVisibility] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book>();

  async function handleSimpleBookSearch() {
    const foundBooks = await findBooksByTitle(selectedBookTitle, observedLibraryProfile.id);
    if (foundBooks.status === "fail") {
      showAlert!(foundBooks.data);
      setBooks([]);
      return;
    }

    setBooks(foundBooks);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedBook?.id) {
      const addedBook = await addExistingBook(observedLibraryProfile.id, selectedBook.id, +copies);
      if (addedBook?.status === "fail") {
        showAlert!(addedBook.data);
        return;
      }

      // dispatch(addBookToLibrary(addedBook));
      showAlert!("Книга успешно добавлена!", "success");
      closeActionModal!();
    }
  }

  return (
    <div className={styles.addBook}>
      <header className={styles.header}>
        Добавить существующую книгу
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.selectWrp}>
          <input
            className={styles.select}
            type="text"
            value={selectedBookTitle}
            onChange={(e) => {
              if (selectedBookTitle !== "") {
                setBooksVisibility(true);
              }

              setSelectedBookTitle(e.currentTarget.value);
              if (selectedBookTitle !== "") {
                handleSimpleBookSearch();
              }
            }}
          />
          <ul className={classNames(styles.books, {
            [styles.visibleBooks]: booksVisibility
          })}>
            {books?.length > 0 && books.map((book, index) => {
              return (
                <li
                  className={styles.bookItem}
                  key={book.id}
                  onClick={() => {
                    setSelectedBook(book);
                    setSelectedBookTitle(book.title);
                    setBooksVisibility(false);
                  }}
                >
                  <div className={styles.number}>{index + 1}</div>
                  {book.title}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.copies}>
          <label
            className={styles.labelCopies}
            htmlFor="copies-amount_input"
          >
            Кол-во экземпляров
          </label>
          <div className={styles.amountWrp}>
            <button 
              className={styles.changeBtn}
              type="button"
              onClick={() => {
                if (+copies > 1) {
                  setCopies(prev => String(+prev - 1));
                }
              }}
            >
              <Minus />
            </button>
            <input
              className={styles.amount}
              id="copies-amount_input"
              type="text"
              part="div"
              maxLength={3}
              name="totalCopies"
              value={copies}
              onInput={(e) => setCopies(e.currentTarget.value)}
            />
            <button 
              className={styles.changeBtn}
              type="button"
              onClick={() => setCopies(prev => String(+prev + 1))}
            >
              <Plus />
            </button>
          </div>
        </div>
        <div className={styles.bookCardWrp}>
          {selectedBook && 
            <BookCard
              id={selectedBook.id}
              type="exists"
              title={selectedBook.title}
              author={selectedBook.author}
              libraryName={observedLibraryProfile.name}
              cover={selectedBook.coverImage}
              description={selectedBook.description}
            />
          }
        </div>
        <div className={styles.btnsWrp}>
          <button
            className={classNames(styles.btn, styles.cancel)}
            type="button"
            onClick={() => closeActionModal!()}
          >
            Отменить
          </button>
          <button
            className={classNames(styles.btn, styles.submit)}
          >
            Добавить книгу
          </button>
        </div>
      </form>
    </div>
  );
}