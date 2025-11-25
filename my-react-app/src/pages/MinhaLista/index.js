import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '../../components/Container';
import Cards from '../../components/Cards';
import videosData from '../../data/videos';

const MYLIST_KEY = 'samu_mylist';
function readMyList() {
  try { return JSON.parse(localStorage.getItem(MYLIST_KEY) || '[]'); } catch (e) { return []; }
}
function saveMyList(list) {
  try {
    localStorage.setItem(MYLIST_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('samu_mylist_update', { detail: list }));
  } catch (e) {}
}

export default function MinhaLista() {
  const [flag, setFlag] = useState(0);
  useEffect(() => {
    const h = () => setFlag(n => n + 1);
    window.addEventListener('samu_mylist_update', h);
    return () => window.removeEventListener('samu_mylist_update', h);
  }, []);

  const all = useMemo(() => Object.values(videosData).flat(), []);
  const listIds = useMemo(() => readMyList(), [flag]);
  const listVideos = useMemo(() => listIds.map(id => all.find(v => v.id === id)).filter(Boolean), [listIds, all]);

  const removeFromList = (id) => {
    const list = readMyList().filter(x => x !== id);
    saveMyList(list);
  };

  return (
    <div className="page">
      <Header />
      <main className="home">
        <Container title="Minha Lista">
          <Cards
            videos={listVideos}
            actions={(v) => (
              <button
                onClick={(e) => { e.stopPropagation(); removeFromList(v.id); }}
                className="btn"
                style={{ padding: '6px 8px', borderRadius: 6, background: '#444', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                Remover
              </button>
            )}
          />
        </Container>
      </main>
      <Footer />
    </div>
  );
}