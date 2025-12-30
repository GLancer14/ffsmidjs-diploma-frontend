import { useContext, useEffect, useState } from "react";
import styles from "./MyBooks.module.scss";
import { useNavigate } from "react-router";
import { getClientOwnRents } from "../../../api/bookRent";
import { type BookRentalResponseDto } from "../../../types/bookRent";
import { UserRents } from "../UserRents/UserRents";
import { AlertContext } from "../../../context/AlertContext";

export function MyBooks() {
  const navigation = useNavigate();
  const { showAlert } = useContext(AlertContext);
  const [userRents, setUserRents] = useState<BookRentalResponseDto[]>([]);

  async function handleSetUserRents() {
    const userRentsRequsetResult = await getClientOwnRents();
    if (userRentsRequsetResult?.status === "fail") {
      showAlert!(userRentsRequsetResult.data);
      return;
    }

    setUserRents(userRentsRequsetResult);
  }

  useEffect(() => {
    handleSetUserRents();
  }, []);

  return (
    <div className={styles.myBooks}>
      <header className={styles.header}>
        Мои книги
      </header>
      {
        userRents.length === 0
          ? (<div className={styles.category}>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  У вас нет активных броней — найдите книгу и забронируйте её!
                </div>
              </div>
              <div className={styles.actionWrp}>
                <button
                  className={styles.action}
                  onClick={() => navigation("/")}
                >
                  Найти книгу
                </button>
              </div>
            </div>)
          : (<UserRents userRents={userRents}/>)
      }
    </div>
  );
}