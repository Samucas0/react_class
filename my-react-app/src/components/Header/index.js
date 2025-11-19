import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} to="/" aria-label="Samu Max - Início">
          <span className={styles.logoMark}>SM</span>
          <span className={styles.logoText}>Samu Max</span>
        </Link>

        <nav className={styles.nav} aria-label="Navegação principal">
          <ul className={styles.navList}>
            <li><Link className={styles.link} to="/">Início</Link></li>
            <li><Link className={styles.link} to="/series">Séries</Link></li>
            <li><Link className={styles.link} to="/filmes">Filmes</Link></li>
            <li><Link className={styles.link} to="/minha-lista">Minha Lista</Link></li>
            <li><Link className={styles.link} to="/buscar">Buscar</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
