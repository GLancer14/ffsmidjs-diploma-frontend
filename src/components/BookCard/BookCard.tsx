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
  library: number;
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
        {type !== "rent" && 
          (<div className={styles.dataLibrary}>
            <span className={styles.field}>Библиотека: </span>
            <span>{library}</span>
          </div>)
        }
        
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