import { useNavigate } from "react-router";
import styles from "./NotFound.module.scss";
import book1 from "../../assets/book-1.svg";
import book2 from "../../assets/book-2.svg";
import book3 from "../../assets/book-3.svg";
import book4 from "../../assets/book-4.svg";
import book5 from "../../assets/book-5.svg";
import book6 from "../../assets/book-6.svg";
import book7 from "../../assets/book-7.svg";
import classNames from "classnames";

export function NotFound() {
  const navigation = useNavigate();
  return (
    <div className={styles.notFound}>
      <div className={styles.wrp}>
        <div className={styles.imagesWrp}>
          <img className={classNames(styles.book1, styles.book)} src={book1} alt="книга" />
          <img className={classNames(styles.book2, styles.book)} src={book2} alt="книга" />
          <img className={classNames(styles.book3, styles.book)} src={book3} alt="книга" />
          <img className={classNames(styles.book4, styles.book)} src={book4} alt="книга" />
          <img className={classNames(styles.book5, styles.book)} src={book5} alt="книга" />
          <img className={classNames(styles.book6, styles.book)} src={book6} alt="книга" />
          <img className={classNames(styles.book7, styles.book)} src={book7} alt="книга" />
        </div>
        <div className={styles.msgWrp}>
          <p className={styles.paragraph}>Ошибка</p>
          <p className={styles.number}>404</p>
          <p className={styles.paragraph}>Упс, кажется что-то пошло не так</p>
          <button
            className={styles.btn}
            onClick={() => navigation("/")}
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );
}