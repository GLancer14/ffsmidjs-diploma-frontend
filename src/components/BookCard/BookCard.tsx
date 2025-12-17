import styles from "./BookCard.module.scss";
import { useEffect, useRef } from "react";
import { applyDynamicEllipsis } from "../../utils/dynamicEllipsis";
import classNames from "classnames";
import { useNavigate, useNavigation } from "react-router";

export interface BookCardProps {
  id: number;
  type?: "regular" | "small" | "rent";
  title: string;
  author: string;
  library: string | number;
  cover?: string;
  year?: number;
  description?: string;
}

export function BookCard({
  id,
  type = "regular",
  title,
  author,
  library,
  cover,
  year,
  description
}: BookCardProps) {
  const navigation = useNavigate();
  const bookDescriptionElement = useRef(null);

  function handleRentClickButton() {
    navigation(`/rent-book/${title}/${author}`);
  }

  useEffect(() => {
    if (bookDescriptionElement.current && type !== "rent") {
      applyDynamicEllipsis(bookDescriptionElement.current, 1.5);
    }
  });

  let librariesBlock;
  if (type === "regular") {
    librariesBlock = (<div className={styles.dataLibrary}>
      <span className={styles.field}>Библиотека: </span>
      <span>{library}</span>
    </div>);
  } else if (type === "small") {
    librariesBlock = (<div className={styles.dataLibrary}>
      <span className={styles.field}>Доступна в {library} библиотеке(ах)</span>
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
      {type !== "rent" &&
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