import { useContext, useEffect, useState } from "react";
import styles from "./Welcome.module.scss";
import { useAppSelector } from "../../../hooks/reduxHook";
import { getBooksCount, getLibrariesCount } from "../../../api/libraries";
import { ActionModalContext } from "../../../context/ActionModalContext";
import { AddLibrary } from "../Actions/AddLibrary/AddLibrary";
import { useNavigate } from "react-router";
import { getUsersCountForWelcome } from "../../../api/users";


export function Welcome() {
  const navigation = useNavigate();
  const { showActionModal } = useContext(ActionModalContext);
  const user = useAppSelector(state => state.userReducer);
  const [librariesCount, setLibrariesCount] = useState<number>(0);
  const [booksCount, setBooksCount] = useState<{all: number; activeRents: number}>()
  const [usersCount, setUsersCount] = useState<{allUsers: number;
    usersWithActiveRents: number;
    newMessages: number}>()

  async function getLibrariesCountFromApi() {
    const count = await getLibrariesCount({searchString: ""});
    setLibrariesCount(count);
  }

  async function getBooksCountFromApi() {
    const count = await getBooksCount();
    setBooksCount(count);
  }

  async function getUsersDataForWelcomeFromApi() {
    const count = await getUsersCountForWelcome();
    setUsersCount(count);
  }

  useEffect(() => {
    if (user.role !== "client") {
      getUsersDataForWelcomeFromApi();
      getBooksCountFromApi();
      getLibrariesCountFromApi();
    }
  }, []);

  return (
    <div className={styles.welcome}>
      <header className={styles.header}>
        {
          user.role === "client"
           ? "Добро пожаловать в личный кабинет!"
           : "Добро пожаловать в админ-панель!"
        }
        
      </header>
      <div className={styles.services}>
        {user.role === "admin" && 
          (<div className={styles.category}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                Всего библиотек: <span className={styles.bold}>{librariesCount}</span>
              </div>
            </div>
            <div className={styles.actionWrp}>
              <button
                className={styles.action}
                onClick={() => {showActionModal!(<AddLibrary />)}}
              >
                Добавить библиотеку
              </button>
            </div>
          </div>)
        }
        {user.role !== "client" && 
          (<>
            <div className={styles.category}>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  Всего книг в системе: <span className={styles.bold}>{booksCount?.all}</span>
                </div>
                <div className={styles.stat}>
                  Активные бронирования: <span className={styles.bold}>{booksCount?.activeRents}</span>
                </div>
              </div>
              <div className={styles.actionWrp}>
                <button
                  className={styles.action}
                  onClick={() => navigation("/profile/libraries")}
                >
                  Добавить книгу
                </button>
              </div>
            </div>
            <div className={styles.category}>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  Всего пользователей: <span className={styles.bold}>{usersCount?.allUsers}</span>
                </div>
                <div className={styles.stat}>
                  С активным бронированием: <span className={styles.bold}>{usersCount?.usersWithActiveRents}</span>
                </div>
                <div className={styles.stat}>
                  Новых сообщений: <span className={styles.bold}>{usersCount?.newMessages}</span>
                </div>
              </div>
              <div className={styles.actionWrp}>
                <button
                  className={styles.action}
                  onClick={() => navigation("/profile/users")}
                >
                  Открыть список
                  </button>
              </div>
            </div>
          </>)
        }
        {user.role === "client" &&
          <div className={styles.category}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                Вы забронировали <span className={styles.bold}></span> книг
              </div>
              <div className={styles.stat}>
                Сейчас у Вас <span className={styles.bold}></span> активных бронирования
              </div>
              <div className={styles.stat}>
                Новых сообщений: <span className={styles.bold}></span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}