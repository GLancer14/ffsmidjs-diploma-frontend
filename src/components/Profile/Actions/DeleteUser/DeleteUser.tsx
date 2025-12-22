import { useContext } from "react";
import styles from "./DeleteUser.module.scss";
import classNames from "classnames";
import { ActionModalContext } from "../../../../context/ActionModalContext";
import { deleteUser } from "../../../../api/users";
import { AlertContext } from "../../../../context/AlertContext";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import { resetObservedUserProfile } from "../../../../store/reducers/observeduserProfileSlice";
import { useNavigate } from "react-router";

export function DeleteUser() {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { showAlert } = useContext(AlertContext);
  const { closeActionModal } = useContext(ActionModalContext);
  const observedUserProfile = useAppSelector(state => state.observedUserProfileReducer);

  async function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (observedUserProfile.id) {
      const deletedUser = await deleteUser(+observedUserProfile.id);

      if (!deletedUser.status) {
        showAlert!("Пользователь успешно удалён!", "success");
        closeActionModal!();
        dispatch(resetObservedUserProfile());
        navigation("/profile/users");
      }
    }
  }

  return (
    <div className={styles.deleteUser}>
      <header className={styles.header}>
        Вы действительно хотите удалить пользователя?
      </header>
      <form className={styles.form} onSubmit={hanldeSubmit}>
        <div className={styles.btnsWrp}>
          <button
            className={classNames(styles.btn, styles.cancel)}
            type="button"
            onClick={() => closeActionModal!()}
          >
            Вернуться назад
          </button>
          <button
            className={classNames(styles.btn, styles.submit)}
          >
            Да, удалить пользователя
          </button>
        </div>
      </form>
    </div>
  );
}