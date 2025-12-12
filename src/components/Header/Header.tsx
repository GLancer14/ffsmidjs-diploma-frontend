import { Link } from "react-router";
import type Product from "../../types/Product";
import styles from "./Header.module.scss";

interface MenuNavProps {
  searchFocused: boolean;
  handleBackBtnClick: () => void;
  setVisibleProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.authWrp}>
          <button className={styles.loginBtn}>Вход</button>
        </div>
        <div className="">
          <Link to="/">
            <span>LOGO</span>
          </Link>
        </div>
        <nav>
          <ul className={styles.navMenu}>
            <li>
              <Link to="#">Библиотеки</Link>
            </li>
            <li>
              <Link to="#">О нас</Link>
            </li>
            <li>
              <Link to="#">Контакты</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}