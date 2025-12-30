import styles from "./BookCard.module.scss";
import { useContext, useEffect, useRef } from "react";
import { applyDynamicEllipsis } from "../../utils/dynamicEllipsis";
import classNames from "classnames";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { AlertContext } from "../../context/AlertContext";
import { addBookToSearchResults } from "../../store/reducers/booksSearchSlice";
import { getBookById } from "../../api/libraries";

export interface BookCardProps {
  id: number;
  type?: "regular" | "small" | "rent" | "exists";
  title: string;
  author: string;
  librariesCount?: number;
  libraryName?: string;
  cover?: string;
  year?: number;
  description?: string;
}

export function BookCard({
  id,
  type = "regular",
  title,
  author,
  librariesCount,
  libraryName,
  cover,
  year,
  description
}: BookCardProps) {
  const navigation = useNavigate();
  const bookDescriptionElement = useRef(null);
  const dispatch = useAppDispatch();
  const booksSearchResults = useAppSelector(state => state.booksSearchReducer);
  const { showAlert } = useContext(AlertContext);
  const user = useAppSelector(state => state.userReducer);

  async function handleRentClickButton() {
    if (user.role === "") {
      showAlert!("Вы не авторизоавны");
      return;
    } else if (user.role !== "client") {
      showAlert!("Не подходящая роль для аренды книги");
      return;
    }

    if (!booksSearchResults.find(book => book.id === id)) {
      const findedBook = await getBookById(String(id));
      if (findedBook?.status === "fail") {
        showAlert!(findedBook.data);
        return;
      }

      dispatch(addBookToSearchResults(findedBook));
    }
    
    navigation(`/rent-book/${id}`);
  }

  useEffect(() => {
    if (bookDescriptionElement.current && type !== "rent") {
      applyDynamicEllipsis(bookDescriptionElement.current, 1.5);
    }
  }, []);

  let librariesBlock;
  if (type === "regular") {
    librariesBlock = (<div className={styles.dataLibrary}>
      <span className={styles.field}>Библиотека: </span>
      <span>{libraryName}</span>
    </div>);
  } else if (type === "small") {
    librariesBlock = (<div className={styles.dataLibrary}>
      <span className={styles.field}>Доступна в {librariesCount} библиотеке(ах)</span>
    </div>);
  } else {
    librariesBlock = null;
  }

  return (
    <div className={classNames(styles.wrp, styles[type])} >
      <img
        className={styles.cover}
        src={`${import.meta.env.VITE_SERVER_URL}/public/images/${cover}`}
        alt="обложка книги"
      />
      <div className={styles.dataWrp}>
        <div className={styles.title}>
          <span>{title}</span>
        </div>
        <div className={styles.data}>
          <span className={styles.field}>Автор: </span>
          <span>{author}</span>
        </div>
        <div className={styles.data}>
          <span className={styles.field}>Год: </span>
          <span>{year}</span>
        </div>
        <div className={styles.dataDesc}>
          <span className={styles.fieldDesc}>Описание: </span>
          <span className={styles.content}ref={bookDescriptionElement}>{description}</span>
        </div>
        {librariesBlock}
      </div>
      {((type !== "rent" && type !== "exists")) &&
        <button
          className={styles.rentBtn}
          onClick={handleRentClickButton}
        >
          Забронировать
        </button>
      }
    </div>
  );
}