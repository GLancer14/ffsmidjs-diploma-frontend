import { useContext, useEffect, useState, type ChangeEvent } from "react";
import styles from "./EditLibrary.module.scss";
import classNames from "classnames";
import { ActionModalContext } from "../../../../context/ActionModalContext";
import { AlertContext } from "../../../../context/AlertContext";
import { createLibrary, updateLibrary } from "../../../../api/libraries";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import { updateLibraryInfo, updateObservedLibraryProfile } from "../../../../store/reducers/observedLibraryProfileSlice";

export function EditLibrary() {
  const dispatch = useAppDispatch();
  const { showAlert } = useContext(AlertContext);
  const { closeActionModal } = useContext(ActionModalContext);

  const observedLibraryProfile = useAppSelector(state => state.observedLibraryProfileReducer);
  const [selectedRole, setSelectedRole] = useState("client");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  async function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updatedLibrary = await updateLibrary({
      id: observedLibraryProfile.id,
      name,
      address,
      description
    });
    // const createdUser = await createUser({
    //   name,
    //   description,
    //   address,
    //   password,
    //   role: selectedRole,
    // });

    if (!updatedLibrary.status) {
      showAlert!("Библиотека успешно обновлена!", "success");
      closeActionModal!();
      setName("");
      setAddress("");
      setDescription("");
      dispatch(updateLibraryInfo({
        name,
        address,
        description,
      }));
    }
  }

  useEffect(() => {
    setName(observedLibraryProfile.name || "");
    setAddress(observedLibraryProfile.address || "");
    setDescription(observedLibraryProfile.description || "");
  }, [observedLibraryProfile]);

  return (
    <div className={styles.library}>
      <header className={styles.header}>
        Редактировать библиотеку
      </header>
      <form className={styles.form} onSubmit={hanldeSubmit}>
        <label className={styles.labelName}>
          <span className={styles.desc}>Название</span>
          <input
            className={styles.inputText}
            type="text"
            value={name}
            placeholder="Например, Центральная городская библиотека"
            onInput={(e) => setName(e.currentTarget.value)}
          />
        </label>
        <label className={styles.labelAddress}>
          <span className={styles.desc}>Адрес</span>
          <input
            className={styles.inputText}
            type="text"
            value={address}
            placeholder="Например, ул. Бауманская, д. 58/25"
            onInput={(e) => setAddress(e.currentTarget.value)}
          />
        </label>
        <label className={styles.labelDescription}>
          <span className={styles.desc}>Описание</span>
          <textarea
            className={classNames(styles.inputText, styles.description)}
            value={description}
            placeholder="Например, Крупнейший центр чтения"
            onInput={(e) => setDescription(e.currentTarget.value)}
          ></textarea>
        </label>
        <div className={styles.btnsWrp}>
          <button
            className={classNames(styles.btn, styles.cancel)}
            type="button"
            onClick={() => closeActionModal!()}
          >
            Отменить
          </button>
          <button
            className={classNames(styles.btn, styles.submit)}
          >
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
}