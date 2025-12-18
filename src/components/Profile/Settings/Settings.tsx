import { useEffect, useRef, useState } from "react";
import styles from "./Settings.module.scss";
import { useAppSelector } from "../../../hooks/reduxHook";
import { getLibrariesCount } from "../../../api/libraries";
import { Paperclip, X } from "lucide-react";
import { fileToDataUrl } from "../../../utils/fileToDataUrl";
import { updateSelf } from "../../../api/user";

export function Settings() {
  const user = useAppSelector(state => state.usersReducer);
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

  async function handleFormSubmit() {
    // const updatedUser = await updateSelf()
  }

  return (
    <div className={styles.welcome}>
      <header className={styles.header}>
        {user.role === "client" ? "Личная информация" : "Настройки"}
      </header>
      <form className={styles.form}>
        <label className={styles.label}>
          <span className={styles.desc}>Имя</span>
          <input
            className={styles.textInput}
            name="form-input-name"
            type="text"
            value={user.name}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.desc}>Телефон</span>
          <input
            className={styles.textInput}
            name="form-input-phone"
            type="text"
            value={user.contactPhone}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.desc}>Почта</span>
          <input
            className={styles.textInput}
            name="form-input-email"
            type="text"
            value={user.email}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.desc}>Пароль</span>
          <input
            className={styles.textInput}
            name="form-input-password"
            type="password"
            placeholder="Введите новый пароль"
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