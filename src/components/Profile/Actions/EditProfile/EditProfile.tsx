import { useContext, useEffect, useState } from "react";
import styles from "./EditProfile.module.scss";
import classNames from "classnames";
import { ActionModalContext } from "../../../../context/ActionModalContext";
import { updateAnotherUser } from "../../../../api/users";
import { AlertContext } from "../../../../context/AlertContext";
import { ChevronUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import { updateObservedUserProfile } from "../../../../store/reducers/observedUserProfileSlice";

// export interface UserDataProp {
//   id?: number;
//   name?: string;
//   email?: string;
//   contactPhone?: string;
//   role?: string;
// }

export function EditProfile() {
  const dispatch = useAppDispatch();
  const { showAlert } = useContext(AlertContext);
  const { closeActionModal } = useContext(ActionModalContext);
  const observedUserProfile = useAppSelector(state => state.observedUserProfileReducer);
  const [selectedRole, setSelectedRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rolesVisibility, setRolesVisibility] = useState(false);

  async function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (observedUserProfile.id) {
      const updatedUser = await updateAnotherUser({
        id: observedUserProfile.id, 
        name,
        email,
        contactPhone,
        password,
        role: selectedRole,
      });

      if (!updatedUser.status) {
      showAlert!("Пользователь успешно обновлён!", "success");
        closeActionModal!();
        // setName("");
        // setEmail("");
        // setContactPhone("");
        // setPassword("");
        setRolesVisibility(false);
        dispatch(updateObservedUserProfile({
          name,
          email,
          contactPhone,
          role: selectedRole,
        }))
        console.log(observedUserProfile)
      }
    }
  }

  useEffect(() => {
    setName(observedUserProfile.name || "");
    setEmail(observedUserProfile.email || "");
    setContactPhone(observedUserProfile.contactPhone || "");
    setSelectedRole(observedUserProfile.role || "client");
  }, [observedUserProfile]);

  return (
    <div className={styles.users}>
      <header className={styles.header}>
        Редактировать личные данные
      </header>
      <form className={styles.form} onSubmit={hanldeSubmit}>
        <label className={styles.labelName}>
          <span className={styles.desc}>ФИО</span>
          <input
            className={styles.inputText}
            type="text"
            value={name}
            placeholder="Иванов Сергей Петрович"
            onInput={(e) => setName(e.currentTarget.value)}
          />
        </label>
        <label className={styles.labelContact}>
          <span className={styles.desc}>Телефон</span>
          <input
            className={styles.inputText}
            type="text"
            value={contactPhone}
            placeholder="+79001234567"
            onInput={(e) => setContactPhone(e.currentTarget.value)}
          />
        </label>
        <label className={styles.labelEmail}>
          <span className={styles.desc}>Почта</span>
          <input
            className={styles.inputText}
            type="text"
            value={email}
            placeholder="sergey.ivanov@example.com"
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </label>
        <label className={styles.labelPassword}>
          <span className={styles.desc}>Пароль</span>
          <input
            className={styles.inputText}
            type="text"
            value={password}
            placeholder="Введите новый пароль"
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <div className={styles.rolesWrp}>
          <label className={styles.descRoles}>
            <span>Роль</span>
            <button
              className={styles.select}
              type="button"
              value={selectedRole}
              onClick={() => setRolesVisibility(!rolesVisibility)}
            >
              {
              selectedRole === "client"
                ? "Клиент"
                : selectedRole === "manager"
                  ? "Библиотекарь"
                  : "Администратор"
              }
              <ChevronUp className={classNames(styles.arrow, {
                [styles.rotatedArrow]: !rolesVisibility,
              })} />
            </button>
          </label>
          <ul className={classNames(styles.roles, {
            [styles.visibleRoles]: rolesVisibility
          })}>
            <li
              className={styles.roleItem}
              onClick={() => {
                setSelectedRole("client");
                setRolesVisibility(false);
              }}
            >
              Клиент
            </li>
            <li
              className={styles.roleItem}
              onClick={() => {
                setSelectedRole("manager");
                setRolesVisibility(false);
              }}
            >
              Библиотекарь
            </li>
            <li
              className={styles.roleItem}
              onClick={() => {
                setSelectedRole("admin");
                setRolesVisibility(false);
              }}
            >
              Администратор
            </li>
          </ul>
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
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
}