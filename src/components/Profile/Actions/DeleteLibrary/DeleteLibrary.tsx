import { useContext } from "react";
import styles from "./DeleteLibrary.module.scss";
import classNames from "classnames";
import { ActionModalContext } from "../../../../context/ActionModalContext";
import { AlertContext } from "../../../../context/AlertContext";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import { useNavigate } from "react-router";
import { deleteLibrary } from "../../../../api/libraries";
import { resetObservedLibraryProfile } from "../../../../store/reducers/observedLibraryProfileSlice";

export function DeleteLibrary() {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { showAlert } = useContext(AlertContext);
  const { closeActionModal } = useContext(ActionModalContext);
  const observedLibraryProfile = useAppSelector(state => state.observedLibraryProfileReducer);

  async function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (observedLibraryProfile.id) {
      const deletedUser = await deleteLibrary(observedLibraryProfile.id);

      if (deletedUser?.status === "fail") {
        showAlert!(deletedUser.data);
        return;
      }

      showAlert!("Библиотека успешно удалёна!", "success");
      closeActionModal!();
      dispatch(resetObservedLibraryProfile());
      navigation("/profile/libraries");
    }
  }

  return (
    <div className={styles.deleteLibrary}>
      <header className={styles.header}>
        Вы действительно хотите удалить библиотеку?
        <div className={styles.clarification}>
          Вместе с библиотекой будут удалены все книги
          <br />
          и бронирования, относящиеся к ней.
        </div>
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
            Да, удалить библиотеку
          </button>
        </div>
      </form>
    </div>
  );
}