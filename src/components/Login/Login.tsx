import styles from "./Login.module.scss";

export interface LoginProps {
  setAuthModalType: React.Dispatch<React.SetStateAction<string>>;
}

export function Login({ setAuthModalType }: LoginProps) {
  return (
    <div className={styles.wrp}>
      <header className={styles.header}>Вход</header>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="login-field">ФИО</label>
        <input className={styles.input} id="login-field" type="text" />
        <label className={styles.label} htmlFor="password-field">Пароль</label>
        <input className={styles.input} id="password-field" type="password" />
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