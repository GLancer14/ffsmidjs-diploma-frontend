import styles from "./BookCard.module.scss";
import { useEffect, useRef } from "react";
import { applyDynamicEllipsis } from "../../utils/dynamicEllipsis";

export interface BookCardProps {
  title: string;
  author: string;
  library: number;
  cover?: string;
  year?: number;
  description?: string;
}

export function BookCard({
  title,
  author,
  library,
  cover,
  year,
  description
}: BookCardProps) {
  const bookDescriptionElement = useRef(null);

  useEffect(() => {
    if (bookDescriptionElement.current) {
      applyDynamicEllipsis(bookDescriptionElement.current);
    }
  })

  return (
    <div className={styles.wrp}>
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
        <div className={styles.dataLibrary}>
          <span className={styles.field}>Библиотека: </span>
          <span>{library}</span>
        </div>
      </div>
      <button className={styles.rentBtn}>Забронировать</button>
    </div>
  );
}