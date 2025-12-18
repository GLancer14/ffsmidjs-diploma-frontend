import { useEffect, useState } from "react";
import styles from "./Settings.module.scss";
import { useAppSelector } from "../../../hooks/reduxHook";
import { getLibrariesCount } from "../../../api/libraries";


export function Settings() {
  const user = useAppSelector(state => state.usersReducer);

  return (
    <div className={styles.welcome}>
      <header className={styles.header}>
        {user.role === "client" ? "Личная информация" : "Настройки"}
      </header>
      <form className={styles.form}>
        <label className={styles.label}>
          <span className={styles.desc}>Имя</span>
          <input className={styles.textInput} type="text" />
        </label>
        <label className={styles.label}>
          <span className={styles.desc}>Телефон</span>
          <input className={styles.textInput} type="text" />
        </label>
        <label className={styles.label}>
          <span className={styles.desc}>Почта</span>
          <input className={styles.textInput} type="text" />
        </label>
        <label className={styles.label}>
          <span className={styles.desc}>Пароль</span>
          <input className={styles.textInput} type="password" />
        </label>
        <label className={styles.label}>
          <span className={styles.desc}>Аватар</span>
          <input className={styles.textInput} type="file" />
        </label>
        <button className={styles.submit}>Сохранить изменения</button>
      </form>
    </div>
  );
}