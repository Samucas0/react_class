import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logoMark}>SM</span>
          <div>
            <div className={styles.title}>Samu Max</div>
            <div className={styles.copy}>&copy; {new Date().getFullYear()} Samu Max</div>
          </div>
        </div>

        <div className={styles.links}>
          <a className={styles.link} href="#">Ajuda</a>
          <a className={styles.link} href="#">Termos</a>
          <a className={styles.link} href="#">Privacidade</a>
        </div>
      </div>
    </footer>
  );
}
