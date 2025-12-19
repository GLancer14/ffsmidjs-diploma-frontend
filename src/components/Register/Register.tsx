import styles from "./Register.module.scss";

export interface RegisterProps {
  setAuthModalType: React.Dispatch<React.SetStateAction<string>>;
}

export function Register({ setAuthModalType }: RegisterProps) {
  return (
    <div className={styles.wrp}>
      <header className={styles.header}>Регистрация</header>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="login-field">ФИО</label>
        <input className={styles.input} id="login-field" type="text" />
        <label className={styles.label} htmlFor="email-field">Почта</label>
        <input className={styles.input} id="email-field" type="text" />
        <label className={styles.label} htmlFor="password-field">Пароль</label>
        <input className={styles.input} id="password-field" type="password" />
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