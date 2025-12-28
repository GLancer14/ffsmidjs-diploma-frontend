import { useContext, useState, type ChangeEvent } from "react";
import styles from "./AddLibrary.module.scss";
import classNames from "classnames";
import { ActionModalContext } from "../../../../context/ActionModalContext";
import { createUser } from "../../../../api/users";
import { AlertContext } from "../../../../context/AlertContext";
import { createLibrary } from "../../../../api/libraries";

export function AddLibrary() {
  const { showAlert } = useContext(AlertContext);
  const { closeActionModal } = useContext(ActionModalContext);
  const [selectedRole, setSelectedRole] = useState("client");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  async function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const createdLibrary = await createLibrary({
      name,
      address,
      description
    });

    if (!createdLibrary.status) {
      showAlert!("Библиотека успешно добавлена!", "success");
      closeActionModal!();
      setName("");
      setAddress("");
      setDescription("");
    }
  }

  return (
    <div className={styles.library}>
      <header className={styles.header}>
        Добавить новую библиотеку
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
            Добавить библиотеку
          </button>
        </div>
      </form>
    </div>
  );
}