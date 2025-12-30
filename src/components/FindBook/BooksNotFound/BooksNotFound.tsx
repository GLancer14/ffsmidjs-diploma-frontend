import styles from "./BooksNotFound.module.scss";

export function BooksNotFound() {
  return (
    <div className={styles.wrp}>
      <header className={styles.header}>По вашему запросу ничего не найдено</header>
      <div className={styles.message}>
        К сожалению, по указанным данным книга не найдена. Проверьте правильность написания или попробуйте изменить параметры поиска (автор, название, дата).
      </div>
    </div>
  );
}