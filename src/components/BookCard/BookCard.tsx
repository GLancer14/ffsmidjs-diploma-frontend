import { Link } from "react-router";
import styles from "./BookCard.module.scss";
import { useState } from "react";
import classNames from "classnames";

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
  return (
    <div className={styles.wrp}>
      <img
        className={styles.cover}
        src={`${import.meta.env.VITE_SERVER_URL}/public/images/${cover}`}
        alt="обложка книги"
      />
      <div className={styles.dataWrp}>
        <div className={styles.title}>{title}</div>
        <div className={styles.data}>
          <span className={styles.field}>Автор: </span>{author}
        </div>
        <div className={styles.data}>
          <span className={styles.field}>Год: </span>{year}
        </div>
        <div className={styles.dataDesc}>
          <span className={styles.field}>Описание: </span>
          <br />
          {description}
        </div>
        <div className={styles.data}>
          <span className={styles.field}>Библиотека: </span>
          <br />
          {library}
        </div>
      </div>
      <button className={styles.rentBtn}>Забронировать</button>
    </div>
  );
}