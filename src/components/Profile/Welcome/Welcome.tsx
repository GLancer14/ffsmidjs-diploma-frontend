import { useContext, useEffect, useState } from "react";
import styles from "./Welcome.module.scss";
import { useAppSelector } from "../../../hooks/reduxHook";
import { getBooksCount, getLibrariesCount } from "../../../api/libraries";
import { ActionModalContext } from "../../../context/ActionModalContext";
import { AddLibrary } from "../Actions/AddLibrary/AddLibrary";
import { useNavigate } from "react-router";
import { getUsersCountForWelcome } from "../../../api/users";
import classNames from "classnames";
import { getRentsCountForWelcome } from "../../../api/bookRent";


export function Welcome() {
  const navigation = useNavigate();
  const { showActionModal } = useContext(ActionModalContext);
  const user = useAppSelector(state => state.userReducer);
  const [librariesCount, setLibrariesCount] = useState<number>(0);
  const [booksCount, setBooksCount] = useState<{all: number; activeRents: number}>()
  const [usersCount, setUsersCount] = useState<{
    allUsers: number;
    usersWithActiveRents: number;
    newMessages: number;
  }>();
  const [rentsCount, setRentsCount] = useState<{all: number; active: number}>();

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

  async function getRentsCountForWelcomeFromApi() {
    const count = await getRentsCountForWelcome(user.id);
    setRentsCount(count);
  }

  useEffect(() => {
    if (user.role !== "client") {
      getUsersDataForWelcomeFromApi();
      getBooksCountFromApi();
      getLibrariesCountFromApi();
    } else {
      getRentsCountForWelcomeFromApi();
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
                Вы забронировали <span className={styles.boldRents}>{rentsCount?.all || 0}</span> книг
              </div>
              <div className={styles.stat}>
                {
                  rentsCount?.active
                    ? (
                      <>
                        Сейчас у Вас <span className={styles.boldRents}>{rentsCount?.active}</span> активных бронирования
                      </>
                    )
                    : "Сейчас у вас нет активных бронирований"
                }
              </div>
              <div className={styles.actionWrp}>
                <button
                  className={classNames(styles.action, styles.rents)}
                  onClick={() => navigation("/profile/users")}
                >
                  Перейти к броням
                </button>
                <button
                  className={classNames(styles.action, styles.find)}
                  onClick={() => navigation("/")}
                >
                  Найти книгу
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}