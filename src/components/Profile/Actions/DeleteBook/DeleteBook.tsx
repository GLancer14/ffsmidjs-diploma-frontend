import { useContext } from "react";
import styles from "./DeleteBook.module.scss";
import classNames from "classnames";
import { ActionModalContext } from "../../../../context/ActionModalContext";
import { AlertContext } from "../../../../context/AlertContext";
import { useAppDispatch } from "../../../../hooks/reduxHook";
import { deleteBook } from "../../../../api/libraries";
import { deleteBookFromLibrary } from "../../../../store/reducers/observedLibraryProfileSlice";

export function DeleteBook({ bookId }: { bookId: number }) {
  const dispatch = useAppDispatch();
  const { showAlert } = useContext(AlertContext);
  const { closeActionModal } = useContext(ActionModalContext);

  async function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (bookId) {
      const deletedBook = await deleteBook(bookId);

      if (!deletedBook.status) {
        showAlert!("Книга успешно удалена!", "success");
        closeActionModal!();
        dispatch(deleteBookFromLibrary({bookId}));
      }
    }
  }

  return (
    <div className={styles.deleteBook}>
      <header className={styles.header}>
        Вы действительно хотите удалить эту книгу?
      </header>
      <form className={styles.form} onSubmit={hanldeSubmit}>
        <div className={styles.btnsWrp}>
          <button
            className={classNames(styles.btn, styles.cancel)}
            type="button"
            onClick={() => closeActionModal!()}
          >
            Нет, вернуться назад
          </button>
          <button
            className={classNames(styles.btn, styles.submit)}
          >
            Да, удалить книгу
          </button>
        </div>
      </form>
    </div>
  );
}