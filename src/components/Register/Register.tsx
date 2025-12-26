import { useContext, useState } from "react";
import styles from "./Register.module.scss";
import { register } from "../../api/auth";
import { useAppDispatch } from "../../hooks/reduxHook";
import { AlertContext } from "../../context/AlertContext";
import { useNavigate } from "react-router";
import { updateCurrentUser } from "../../store/reducers/userSlice";

export interface RegisterProps {
  setAuthModalType: React.Dispatch<React.SetStateAction<string>>;
}

export function Register({ setAuthModalType }: RegisterProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const { showAlert } = useContext(AlertContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const registredUser = await register(
      name,
      email,
      password,
    );

    if (registredUser?.status === "fail") {
      showAlert!(registredUser?.data);
      return;
    }
    
    dispatch(updateCurrentUser(registredUser));
    navigation("/profile");
  }

  return (
    <div className={styles.wrp}>
      <header className={styles.header}>Регистрация</header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="login-field">ФИО</label>
        <input
          className={styles.input}
          id="login-field"
          type="text"
          onInput={e => setName(e.currentTarget.value)}
        />
        <label className={styles.label} htmlFor="email-field">Почта</label>
        <input
          className={styles.input}
          id="email-field"
          type="text"
          onInput={e => setEmail(e.currentTarget.value)}
        />
        <label className={styles.label} htmlFor="password-field">Пароль</label>
        <input
          className={styles.input}
          id="password-field"
          type="password"
          onInput={e => setPassword(e.currentTarget.value)}
        />
        <button className={styles.submit}>Зарегистрироваться</button>
      </form>
      <div className={styles.login}>
        <span>У меня уже есть аккаунт. </span>
        <button
          className={styles.loginBtn}
          onClick={() => setAuthModalType("login")}
        >
          Войти
        </button>
      </div>
    </div>
  );
}