import React, { useMemo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '../../components/Container';
import Cards from '../../components/Cards';
import videosData from '../../data/videos';

function groupByGenre(items) {
  const map = {};
  items.forEach(v => {
    (v.genres || ['Sem gênero']).forEach(g => {
      if (!map[g]) map[g] = [];
      map[g].push(v);
    });
  });
  return map;
}

export default function Series() {
  const all = useMemo(() => Object.values(videosData).flat(), []);
  const series = useMemo(() => all.filter(v => v.type === 'series'), [all]);
  const byGenre = useMemo(() => groupByGenre(series), [series]);
  const genres = useMemo(() => Object.keys(byGenre).sort(), [byGenre]);

  return (
    <div className="page">
      <Header />
      <main className="home">
        {genres.map(genre => (
          <Container key={genre} title={`${genre} (${byGenre[genre].length})`}>
            <Cards videos={byGenre[genre]} />
          </Container>
        ))}
      </main>
      <Footer />
    </div>
  );
}