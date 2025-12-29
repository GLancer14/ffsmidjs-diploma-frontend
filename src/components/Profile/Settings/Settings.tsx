import { useContext, useEffect, useState } from "react";
import styles from "./Settings.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { updateSelf } from "../../../api/users";
import { updateCurrentUser } from "../../../store/reducers/userSlice";
import { AlertContext } from "../../../context/AlertContext";

export function Settings() {
  const dispatch = useAppDispatch();
  const { showAlert } = useContext(AlertContext);
  const user = useAppSelector(state => state.userReducer);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [password, setPassword] = useState("");

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updatedUser = await updateSelf({
      name,
      email,
      contactPhone,
      password,
    });

    if (updatedUser.status === "fail" || updatedUser.status === "error") {
      showAlert!(updatedUser.data);
      return;
    }

    dispatch(updateCurrentUser(updatedUser));
  }

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setContactPhone(user.contactPhone);
  }, []);

  return (
    <div className={styles.welcome}>
      <header className={styles.header}>
        {user.role === "client" ? "Личная информация" : "Настройки"}
      </header>
      <form className={styles.form} onSubmit={e => {handleFormSubmit(e)}}>
        <label className={styles.label}>
          <span className={styles.desc}>Имя</span>
          <input
            className={styles.textInput}
            name="form-input-name"
            type="text"
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.desc}>Телефон</span>
          <input
            className={styles.textInput}
            name="form-input-phone"
            type="text"
            value={contactPhone}
            onInput={(e) => setContactPhone(e.currentTarget.value)}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.desc}>Почта</span>
          <input
            className={styles.textInput}
            name="form-input-email"
            type="text"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.desc}>Пароль</span>
          <input
            className={styles.textInput}
            name="form-input-password"
            type="password"
            placeholder="Введите новый пароль"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <button className={styles.submit}>Сохранить изменения</button>
      </form>
    </div>
  );
}