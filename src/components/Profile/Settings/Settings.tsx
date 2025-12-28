import { useEffect, useRef, useState } from "react";
import styles from "./Settings.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { Paperclip, X } from "lucide-react";
import { fileToDataUrl } from "../../../utils/fileToDataUrl";
import { updateSelf } from "../../../api/users";
import { updateCurrentUser } from "../../../store/reducers/userSlice";

export function Settings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userReducer);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const avatarFileInput = useRef<HTMLInputElement>(null);

  async function handleAvatarSelect (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      const files = [...e.target.files];
      const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
      setAvatar(urls[0]);
    }
  }

  function handleAvatarDelete() {
    if (avatarFileInput.current) {
      avatarFileInput.current.value = "";
    }

    setAvatar(null);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updatedUser = await updateSelf({
      name,
      email,
      contactPhone,
      password,
    });

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
        <label className={styles.label} htmlFor="options_avatar-file-input">Аватар</label>
        {avatar && 
          <img className={styles.avatar} src={avatar} alt="аватар" />
        }
        <div className={styles.avatarActions}>
          {avatar
            ? (<div className={styles.fileActionWrp}>
                <Paperclip className={styles.icon} />
                <label
                  className={styles.btn}
                  htmlFor="options_avatar-file-input"
                >
                  Изменить фото
                </label>
                <X className={styles.icon} />
                <button
                  className={styles.btn}
                  type="button"
                  onClick={handleAvatarDelete}
                >
                  Удалить фото
                </button>
              </div>)
            : (<div className={styles.fileActionWrp}>
                <Paperclip className={styles.icon} />
                <label
                  className={styles.btn}
                  htmlFor="options_avatar-file-input"
                >
                  Добавить фото
                </label>
              </div>)
          }
          <input
            className={styles.fileInput}
            id="options_avatar-file-input"
            name="form-input-file"
            accept="image/jpg, image/jpeg"
            ref={avatarFileInput}
            onChange={handleAvatarSelect}
            type="file"
          />
        </div>
        <button className={styles.submit}>Сохранить изменения</button>
      </form>
    </div>
  );
}