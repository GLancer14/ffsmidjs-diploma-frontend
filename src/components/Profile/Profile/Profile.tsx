import styles from "./Profile.module.scss";

export function Profile({children}: {children: React.ReactNode}) {
  return (
    <div className={styles.wrp}>
      {children}
    </div>
  );
}