import { useContext, useEffect, useState, type ChangeEvent } from "react";
import styles from "./LibraryProfile.module.scss";
import { getUserById } from "../../../api/users";
import { ActionModalContext } from "../../../context/ActionModalContext";
import { ArrowBigLeft, BookMarked, SquareCheck } from "lucide-react";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { findUserBookRents } from "../../../api/bookRent";
import { type BookRentalResponseDto } from "../../../store/reducers/usersRentsSlice";
import { parseDateFromUTCToRu } from "../../../utils/parseRuDate";
import { EditProfile } from "../Actions/EditProfile/EditProfile";
import { DeleteUser } from "../Actions/DeleteUser/DeleteUser";
import { getLibraryById } from "../../../api/libraries";
import { updateObservedLibraryProfile } from "../../../store/reducers/observedLibraryProfileSlice";

export function LibraryProfile() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { showActionModal } = useContext(ActionModalContext);
  const observedLibraryProfile = useAppSelector(state => state.observedLibraryProfileReducer);
  const navigation = useNavigate();
  const [userRents, setUserRents] = useState<BookRentalResponseDto[]>([]);
  const [rentType, setRentType] = useState("all");
  // const [userData, setUserData] = useState<User>();

  const booksList = observedLibraryProfile.book.map(book => {
    return (
      <div className={styles.row} key={book.book.id}>
        <div className={classNames(styles.id, styles.cell)}>{book.book.id}</div>
        <div className={classNames(styles.title, styles.cell)}>{book.book.title}</div>
        <div className={classNames(styles.author, styles.cell)}>{book.book.author}</div>
        <div className={classNames(styles.year, styles.cell)}>{book.book.year}</div>
        <div className={classNames(styles.description, styles.cell)}>{book.book.description}</div>
        <div className={classNames(styles.copies, styles.cell)}>{book.totalCopies}</div>
        <div className={classNames(styles.actions, styles.cell)}>
          
        </div>
      </div>
    );
  });
                

  async function handleGetLibraryData() {
    if (params.id) {
      const library = await getLibraryById(params.id);

      dispatch(updateObservedLibraryProfile(library));
      // setUserData(user);
    }
  }

  useEffect(() => {
    handleGetLibraryData();
  }, []);

  function handleRentTypeChange(e: ChangeEvent<HTMLInputElement>) {
    setRentType(e.currentTarget.value);
  }

  return (
    <div className={styles.libraryProfile}>
      <header className={styles.header}>
        <span>{observedLibraryProfile.name}</span>
        <button
          className={styles.back}
          onClick={() => {
            navigation("/profile/libraries");
          }}
        >
          <ArrowBigLeft />
          Назад
        </button>
      </header>
      <div className={styles.card}>
        <header className={styles.cardHeader}>Информация</header>
        <div className={styles.dataWrp}>
          <div className={styles.desc}>Название:</div>
          <div className={styles.content}>{observedLibraryProfile.name}</div>
          <div className={styles.desc}>Адрес:</div>
          <div className={styles.content}>{observedLibraryProfile.address}</div>
          <div className={styles.desc}>Описание:</div>
          <div className={styles.content}>{observedLibraryProfile.description}</div>
          <div className={styles.desc}>Всего книг:</div>
          <div className={styles.content}>{observedLibraryProfile.totalCopies}</div><div className={styles.desc}>Доступно книг:</div>
          <div className={styles.content}>{observedLibraryProfile.availableCopies}</div>
        </div>
        <div className={styles.btnsWrp}>
          <button
            className={classNames(styles.btn, styles.edit)}
            type="button"
            onClick={() => {
              showActionModal!(
                <EditProfile />
              );
            }}
          >
            Редактировать
          </button>
          <button
            className={classNames(styles.btn, styles.delete)}
            type="button"
            onClick={() => {
              showActionModal!(
                <DeleteUser />
              );
            }}
          >
            Удалить библиотеку
          </button>
        </div>
      </div>
      <div className={styles.books}>
        <form className={styles.booksForm}>
          <label className={styles.label}>
            <span className={styles.desc}>Все</span>
            <input
              className={styles.radio}
              type="radio"
              name="user-type"
              value="all"
              onChange={handleRentTypeChange}
            />
          </label>
          <label className={styles.label}>
            <span className={styles.desc}>Автор</span>
            <input
              className={styles.radio}
              type="radio"
              name="user-type"
              value="reserved"
              onChange={handleRentTypeChange}
            />
          </label>
          <label className={styles.label}>
            <span className={styles.desc}>Кол-во экземпляров</span>
            <input
              className={styles.radio}
              type="radio"
              name="user-type"
              value="complete"
              onChange={handleRentTypeChange}
            />
          </label>
          <button
            className={styles.addBookBtn}
            onClick={() => {
              // showActionModal!(<AddLibrary />);
            }}
          >
            Добавить книгу
          </button>
        </form>
        <div className={styles.table}>
          <div className={styles.headerRow}>
            <div className={classNames(styles.id, styles.cell)}>ID</div>
            <div className={classNames(styles.title, styles.cell)}>Название</div>
            <div className={classNames(styles.author, styles.cell)}>Автор</div>
            <div className={classNames(styles.year, styles.cell)}>Год</div>
            <div className={classNames(styles.description, styles.cell)}>Описание</div>
            <div className={classNames(styles.copies, styles.cell)}>Кол-во экземпляров</div>
            <div className={classNames(styles.actions, styles.cell)}>Действие</div>
          </div>
          {
            booksList.length === 0
              ? (<div className={styles.noResults}>Записи отсутствуют</div>)
              : booksList
          }
        </div>
      </div>
    </div>
  );
}