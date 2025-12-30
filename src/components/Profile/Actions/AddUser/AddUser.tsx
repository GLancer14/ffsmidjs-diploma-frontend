import { useContext, useState, type ChangeEvent } from "react";
import styles from "./AddUser.module.scss";
import classNames from "classnames";
import { ActionModalContext } from "../../../../context/ActionModalContext";
import { createUser } from "../../../../api/users";
import { AlertContext } from "../../../../context/AlertContext";

export function AddUser() {
  const { showAlert } = useContext(AlertContext);
  const { closeActionModal } = useContext(ActionModalContext);
  const [selectedRole, setSelectedRole] = useState("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [password, setPassword] = useState("");

  function handleChooseRole(e: ChangeEvent<HTMLInputElement>) {
    setSelectedRole(e.currentTarget.value);
  }

  async function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const createdUser = await createUser({
      name,
      email,
      contactPhone,
      password,
      role: selectedRole,
    });

    if (createdUser?.status === "fail") {
      showAlert!(createdUser.data);
      return;
    }

    showAlert!("Пользователь успешно создан!", "success");
    closeActionModal!();
    setName("");
    setEmail("");
    setContactPhone("");
    setPassword("");
    setSelectedRole("client");
  }

  return (
    <div className={styles.users}>
      <header className={styles.header}>
        Добавить нового пользователя
      </header>
      <form className={styles.form} onSubmit={hanldeSubmit}>
        <label className={styles.labelName}>
          <span className={styles.desc}>ФИО</span>
          <input
            className={styles.inputText}
            type="text"
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
          />
        </label>
        <label className={styles.labelContact}>
          <span className={styles.desc}>Телефон</span>
          <input
            className={styles.inputText}
            type="text"
            value={contactPhone}
            onInput={(e) => setContactPhone(e.currentTarget.value)}
          />
        </label>
        <label className={styles.labelEmail}>
          <span className={styles.desc}>Почта</span>
          <input
            className={styles.inputText}
            type="text"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </label>
        <label className={styles.labelPassword}>
          <span className={styles.desc}>Пароль</span>
          <input
            className={styles.inputText}
            type="text"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <div className={styles.descRoles}>Роль</div>
        <div className={styles.radioWrp}>
          <label className={styles.label}>
            <input
              className={styles.inputRadio}
              type="radio"
              name="role"
              value="client"
              onChange={handleChooseRole}
              checked={selectedRole === "client"}
            />
            <span className={styles.desc}>Клиент</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.inputRadio}
              type="radio"
              name="role"
              value="manager"
              onChange={handleChooseRole}
              checked={selectedRole === "manager"}
            />
            <span className={styles.desc}>Библиотекарь</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.inputRadio}
              type="radio"
              name="role"
              value="admin"
              onChange={handleChooseRole}
              checked={selectedRole === "admin"}
            />
            <span className={styles.desc}>Администратор</span>
          </label>
        </div>
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
            Добавить пользователя
          </button>
        </div>
      </form>
    </div>
  );
}