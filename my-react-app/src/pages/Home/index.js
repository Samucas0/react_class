import './Home.module.css';
import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import Container from '../../components/Container';
import Cards from '../../components/Cards';
import Footer from '../../components/Footer';
import videosData from '../../data/videos';

const STORAGE_KEY = 'samu_watch_progress';
function readProgressFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

export default function Home() {
  const [progress, setProgress] = useState(() => readProgressFromStorage());

  useEffect(() => {
    const onStorage = () => setProgress(readProgressFromStorage());
    const onCustom = (e) => {
      setProgress(readProgressFromStorage());
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('samu_progress_update', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('samu_progress_update', onCustom);
    };
  }, []);

  const allVideos = useMemo(() => {
    const lists = Object.values(videosData).flat();
    const map = {};
    lists.forEach((v) => { if (v && v.id) map[v.id] = v; });
    return map;
  }, []);

  const continueVideos = useMemo(() => {
    const ids = Object.keys(progress).filter(id => progress[id] > 0 && allVideos[id]);
    return ids.map(id => ({ ...allVideos[id], startAt: progress[id] }));
  }, [progress, allVideos]);

  return (
    <>
      <Header />
      <Banner />
      <main className="home">
        {continueVideos.length > 0 && (
          <Container title="Continuar assistindo">
            {/* aqui passamos showRemove para habilitar o 'x' só nesta seção */}
            <Cards videos={continueVideos} progressMap={progress} showRemove />
          </Container>
        )}

        <Container title="Em destaque">
          <Cards videos={videosData.featured} progressMap={progress} />
        </Container>

        <Container title="Recomendados para você">
          <Cards videos={videosData.recommended} progressMap={progress} />
        </Container>

        <Container title="Mais para você">
          <Cards videos={videosData.more} progressMap={progress} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
