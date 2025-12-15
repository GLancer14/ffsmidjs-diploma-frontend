
import styles from "./Footer.module.scss";
import vk from "../../assets/social-vk.svg";
import tg from "../../assets/social-telegram.svg";
import yt from "../../assets/social-youtube.svg";
import ok from "../../assets/social-odnoklassniki.svg";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.logo}>
        <Link to="#">LOGO</Link>
      </div>
      <div className={styles.social}>
        <a className={styles.iconLink} href="#">
          <img className={styles.icon} src={vk} alt="ссылка на вконтакте" />
        </a>
        <a className={styles.iconLink} href="#">
          <img className={styles.icon} src={tg} alt="ссылка на телеграм" />
        </a>
        <a className={styles.iconLink} href="#">
          <img className={styles.icon} src={yt} alt="ссылка на youtube" />
        </a>
        <a className={styles.iconLink} href="#">
          <img className={styles.icon} src={ok} alt="ссылка на одноклассники" />
        </a>
      </div>
      <div className={styles.policy}>
        <a href="#">Политика обработки персональных данных</a>
      </div>
    </footer>
  );
}