import styles from './Header.module.css';

function Header(){
    return (
        // Conteudo a ser exibido
        // JSX => html + xml (html com css dentro do javascript)
        <header className={styles.header}>
            <span>Aula Senac</span>
            <nav className={styles.nav}>
                <a href="#">Home</a>
                <a href="#">Senac</a>
            </nav>
        </header>
    )
}

export default Header;
