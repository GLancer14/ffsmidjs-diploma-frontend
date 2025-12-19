import { useContext, useState } from "react";
import styles from "./Login.module.scss";
import { login } from "../../api/auth";
import { useAppDispatch } from "../../hooks/reduxHook";
import { updateCurrentUser } from "../../store/reducers/userSlice";
import { useNavigate } from "react-router";
import { AlertContext } from "../../context/AlertContext";

export interface LoginProps {
  setAuthModalType: React.Dispatch<React.SetStateAction<string>>;
}

export function Login({ setAuthModalType }: LoginProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const { showAlert } = useContext(AlertContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = await login(email, password);
    if (user?.status === "fail") {
      showAlert!(user?.data);
      return;
    }
    
    dispatch(updateCurrentUser(user));
    navigation("/profile");
  }

  return (
    <div className={styles.wrp}>
      <header className={styles.header}>Вход</header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="login-field">Email</label>
        <input
          className={styles.input}
          id="login-field"
          type="text"
          value={email}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
        <label className={styles.label} htmlFor="password-field">Пароль</label>
        <input
          className={styles.input}
          id="password-field"
          type="password"
          value={password}
          onInput={(e) => setPassword(e.currentTarget.value)}
        />
        <button className={styles.submit}>Войти</button>
      </form>
      <div className={styles.register}>
        <span>Нет аккаунта? </span>
        <button
          className={styles.registerBtn}
          onClick={() => setAuthModalType("register")}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
}