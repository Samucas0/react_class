import React, { useMemo, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '../../components/Container';
import Cards from '../../components/Cards';
import videosData from '../../data/videos';
import styles from './Buscar.module.css';

export default function Buscar() {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const all = useMemo(() => Object.values(videosData).flat(), []);
  const genres = useMemo(() => {
    const s = new Set();
    all.forEach(v => (v.genres || []).forEach(g => s.add(g)));
    return ['Todos', ...Array.from(s).sort()];
  }, [all]);

  const results = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    return all.filter(v => {
      if (!v || !v.title) return false;
      if (selectedGenre && selectedGenre !== 'Todos') {
        if (!v.genres || !v.genres.includes(selectedGenre)) return false;
      }
      if (!q) return true;
      return (v.title || '').toLowerCase().includes(q);
    });
  }, [query, all, selectedGenre]);

  return (
    <div className="page">
      <Header />
      <main className="home">
        <div className="wrap" style={{ paddingTop: 12 }}>
          <label htmlFor="q" style={{ display: 'block', marginBottom: 8 }}>Buscar</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              id="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Procure por título"
              className={styles.searchInput}
            />
            <div className={styles.genreFilters} role="tablist" aria-label="Filtrar por gênero">
              {genres.map(g => {
                const active = (selectedGenre === g) || (g === 'Todos' && !selectedGenre);
                return (
                  <button
                    key={g}
                    className={`${styles.genreBtn} ${active ? styles.active : ''}`}
                    onClick={() => setSelectedGenre(g === 'Todos' ? '' : g)}
                    aria-pressed={active}
                    type="button"
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <Container title={`Resultados (${results.length})`}>
          <Cards key={`${query}-${selectedGenre}-${results.length}`} videos={results} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}