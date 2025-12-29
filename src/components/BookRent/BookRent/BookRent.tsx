
import { useNavigate, useParams } from "react-router";
import styles from "./BookRent.module.scss";
import { useContext, useState } from "react";
import { BookCard } from "../../BookCard/BookCard";
import { BookCheck } from "lucide-react";
import { RentRange } from "../../RentRange/RentRange";
import { rentBook } from "../../../api/bookRent";
import { parseRuDate } from "../../../utils/parseRuDate";
import { useAppSelector } from "../../../hooks/reduxHook";
import { AlertContext } from "../../../context/AlertContext";

export function BookRent() {
  const params = useParams();
  const navigation = useNavigate();
  const user = useAppSelector(state => state.userReducer);
  const { showAlert } = useContext(AlertContext);
  const booksSearchResults = useAppSelector(state => state.booksSearchReducer);
  const dateRange = useAppSelector(state => state.bookRentRangeSlice);
  // const [booksData, setBooksData] = useState<Book[] | null>(null);
  const [library, setLibrary] = useState<number>(0);
  const [rentedBook, setRentedBook] = useState<number>(0);

  const booksData = booksSearchResults.find(book => {
    if (params.id) {
      return book.id === +params?.id;
    }
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedRuDates = [
      parseRuDate(dateRange.dateStart),
      parseRuDate(dateRange.dateEnd),
    ];

    const sentRentedBook = await rentBook({
      libraryId: library,
      bookId: rentedBook,
      dateStart: parsedRuDates[0],
      dateEnd: parsedRuDates[1],
    });

    if (sentRentedBook.status === "fail" || sentRentedBook.status === "error") {
      showAlert!(sentRentedBook.data);
      return;
    }

    navigation(`/rent-book/result/${sentRentedBook.id}`);
  }

  if (booksData) {
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <header className={styles.header}>Бронирование книги "{booksData.title}"</header>
        <div className={styles.card}>
          <BookCard
            id={booksData.id}
            key={booksData.id}
            type="rent"
            title={booksData.title}
            author={booksData.author}
            libraryName={booksData.library[0].library.name}
            cover={booksData.coverImage}
            year={booksData.year}
            description={booksData.description}
          />
        </div>
        <div className={styles.libraries}>
          <header className={styles.header}>Выберите библиотеку</header>
          {booksData.library.map(libraryData => {
            return (
              <label className={styles.library} key={libraryData.libraryId}>
                {libraryData.isAvailable && 
                  <input
                    className={styles.radio}
                    type="radio"
                    name="library"
                    value={library}
                    onClick={() => {
                      setLibrary(libraryData.libraryId);
                      setRentedBook(booksData.id);
                    }}
                  />
                }
                <div className={styles.text}>
                  <div className={styles.name}>{libraryData.library.name}</div>
                  <div className={styles.address}>{libraryData.library.address}</div>
                </div>
                <div className={styles.copiesWrp}>
                  <BookCheck size={24} />
                  <div className={styles.copies}>
                    <span>{libraryData.availableCopies}</span>
                    /
                    <span>{libraryData.totalCopies}</span>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
        <div className={styles.dateRange}>
          <header className={styles.header}>Период бронирования</header>
          <RentRange disabled={true}/>
        </div>
        <button className={styles.submit}>Подтвердить бронирование</button>
      </form>
    );
  }
}