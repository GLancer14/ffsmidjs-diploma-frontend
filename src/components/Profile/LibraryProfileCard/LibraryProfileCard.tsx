
import { useContext, useEffect, useState, type ChangeEvent } from "react";
import styles from "./LibraryProfileCard.module.scss";
import { ActionModalContext } from "../../../context/ActionModalContext";
import { ArrowBigLeft, ChevronsLeft, ChevronsRight, Pencil, Trash2 } from "lucide-react";
import classNames from "classnames";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { DeleteUser } from "../Actions/DeleteUser/DeleteUser";
import { getLibraryById } from "../../../api/libraries";
import { observedLibraryProfileSlice, updateObservedLibraryProfile } from "../../../store/reducers/observedLibraryProfileSlice";
import Pagination from "@mui/material/Pagination";
import { EditLibrary } from "../Actions/EditLibrary/EditLibrary";
import { DeleteLibrary } from "../Actions/DeleteLibrary/DeleteLibrary";
import { AddBook } from "../Actions/AddBook/AddBook";
import { EditBook } from "../Actions/EditBook/EditBook";
import { DeleteBook } from "../Actions/DeleteBook/DeleteBook";

export interface observedLibraryDataProp {
  name?: string;
  address?: string;
  description?: string;
  totalCopies?: number;
  availableCopies?: number;
}

export function LibraryProfileCard({
  name,
  address,
  description,
  totalCopies,
  availableCopies,
}: observedLibraryDataProp) {
  const navigation = useNavigate();
  const location = useLocation();
  const { showActionModal } = useContext(ActionModalContext);
  const user = useAppSelector(state => state.userReducer);
  const observedLibrary = useAppSelector(state => state.observedLibraryProfileReducer);

  return (
    <div className={styles.card}>
      <header className={styles.cardHeader}>Информация</header>
      <div className={styles.dataWrp}>
        <div className={styles.desc}>Название:</div>
        <div className={styles.content}>{name}</div>
        <div className={styles.desc}>Адрес:</div>
        <div className={styles.content}>{address}</div>
        <div className={styles.desc}>Описание:</div>
        <div className={styles.content}>{description}</div>
        <div className={styles.desc}>Всего книг:</div>
        <div className={styles.content}>{totalCopies}</div><div className={styles.desc}>Доступно книг:</div>
        <div className={styles.content}>{availableCopies}</div>
      </div>
        {
          user.role === "admin" && 
            (<div className={styles.btnsWrp}>
              <button
                className={classNames(styles.btn, styles.edit)}
                type="button"
                onClick={() => {
                  showActionModal!(
                    <EditLibrary />
                  );
                }}
              >
                Редактировать
              </button>
              <button
                className={classNames(styles.btn, styles.delete)}
                type="button"
                onClick={() => {
                  showActionModal!(
                    <DeleteLibrary />
                  );
                }}
              >
                Удалить библиотеку
              </button>
            </div>)
        }
        {
          location.pathname === "/profile/books" && 
            (<div className={styles.btnsWrp}>
              <button
                className={classNames(styles.btn, styles.add)}
                type="button"
                onClick={() => {
                  showActionModal!(
                    <AddBook />
                  );
                }}
              >
                Добавить книгу
              </button>
              <button
                className={classNames(styles.btn, styles.open)}
                type="button"
                onClick={() => {
                  navigation(`/profile/libraries/${observedLibrary.id}`)
                }}
              >
                Открыть каталог
              </button>
            </div>)
        }
    </div>
  );
}

