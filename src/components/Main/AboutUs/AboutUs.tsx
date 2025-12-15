import styles from "./AboutUs.module.scss";
import stackOfBooks from "../../../assets/stack-of-books-1.svg";

export function AboutUs() {
  return (
    <div className={styles.wrp} id="about-us">
      <div className={styles.content}>
        <div className={styles.text}>
          <header className={styles.header}>О нас</header>
          <div className={styles.description}>
            <p>
              Наш сервис — это единый портал, соединяющий все крупнейшие и малые библиотеки Москвы. Здесь работают лучшие библиотекари, краеведы и историки города, бережно собирающие и описывающие книжные сокровища столицы. Через наш агрегатор вы сможете быстро найти любую книгу — от редких дореволюционных изданий до новинок современной литературы.
            </p>
            <p>
              Достаточно ввести название или автора и система покажет, в каких библиотеках есть нужный экземпляр. Вы можете выбрать удобный филиал, забронировать книгу онлайн и забрать её в назначенное время.
            </p>
            <p>
              Сервис охватывает все округа Москвы, так что любимые книги всегда окажутся рядом.
            </p>
          </div>
        </div>
        <img className={styles.stackImage} src={stackOfBooks} alt="стопка книг" />
      </div>
    </div>
  );
}