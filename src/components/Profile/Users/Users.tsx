import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Users.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { fileToDataUrl } from "../../../utils/fileToDataUrl";
import { updateSelf } from "../../../api/users";
import { updateCurrentUser } from "../../../store/reducers/userSlice";
import { AddUser } from "../Actions/AddUser/AddUser";
import { ActionModalContext } from "../../../context/ActionModalContext";

export function Users() {
  const { showActionModal } = useContext(ActionModalContext);

  return (
    <div className={styles.users}>
      <header className={styles.header}>
        <span>Пользователи</span>
        <button
          className={styles.addUserBtn}
          onClick={() => {
            showActionModal!(<AddUser/>);
          }}
        >
          Добавить пользователя
        </button>
      </header>
      <form className={styles.form}>
        <input className={styles.search} type="text" />
        <div className={styles.usersTypesWrp}>
          <label className={styles.label}>
            <span>Все</span>
            <input className={styles.input} type="radio" />
          </label>
          <label className={styles.label}>
            <span>Администратор</span>
            <input className={styles.input} type="radio" />
          </label>
          <label className={styles.label}>
            <span>Библиотекарь</span>
            <input className={styles.input} type="radio" />
          </label>
          <label className={styles.label}>
            <span>Клиент</span>
            <input className={styles.input} type="radio" />
          </label>
        </div>
      </form>
    </div>
  );
}