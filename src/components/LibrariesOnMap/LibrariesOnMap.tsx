import styles from "./LibrariesOnMap.module.scss";

export function LibrariesOnMap() {
  return (
    <div className={styles.wrp} id="libraries">
      <header className={styles.header}>Библиотеки Москвы</header>
      <div className={styles.mapContainer}></div>
    </div>
  );
}