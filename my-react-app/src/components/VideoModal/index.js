import React, { useEffect, useState, useRef } from 'react';
import styles from './VideoModal.module.css';

const STORAGE_KEY = 'samu_watch_progress';
const MYLIST_KEY = 'samu_mylist';

function saveProgressToStorage(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    try { window.dispatchEvent(new CustomEvent('samu_progress_update', { detail: progress })); } catch (e) {}
  } catch (e) {}
}
function readProgressFromStorage() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) { return {}; }
}

function readMyList() {
  try { return JSON.parse(localStorage.getItem(MYLIST_KEY) || '[]'); } catch (e) { return []; }
}
function saveMyList(list) {
  try {
    localStorage.setItem(MYLIST_KEY, JSON.stringify(list || []));
    try { window.dispatchEvent(new CustomEvent('samu_mylist_update', { detail: list })); } catch (e) {}
  } catch (e) {}
}

function fmtTime(sec = 0) {
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  const m = Math.floor((sec / 60) % 60).toString().padStart(2, '0');
  const h = Math.floor(sec / 3600);
  return h ? `${h}:${m}:${s}` : `${m}:${s}`;
}

export default function VideoModal({ video, onClose }) {
  const [playing, setPlaying] = useState(false);
  const [watched, setWatched] = useState(0);
  const [inMyList, setInMyList] = useState(false);
  const tickRef = useRef(null);

  useEffect(() => {
    if (!video) return;
    setPlaying(false);
    const progress = readProgressFromStorage();
    setWatched(progress[video.id] || (video.startAt || 0) || 0);
    setInMyList(readMyList().includes(video.id));
  }, [video]);

  useEffect(() => {
    if (playing) {
      tickRef.current = setInterval(() => setWatched(w => w + 1), 1000);
    } else if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    return () => { if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; } };
  }, [playing]);

  useEffect(() => {
    const id = setInterval(() => {
      const stored = readProgressFromStorage();
      stored[video.id] = watched;
      saveProgressToStorage(stored);
    }, 5000);
    return () => {
      clearInterval(id);
      const stored = readProgressFromStorage();
      stored[video.id] = watched;
      saveProgressToStorage(stored);
    };
  }, [watched, video]);

  if (!video) return null;

  const embedSrc = (autoplay = false, start = 0) =>
    `https://www.youtube.com/embed/${video.id}?rel=0&controls=1&modestbranding=1${autoplay ? '&autoplay=1' : ''}${start ? `&start=${start}` : ''}`;

  const toggleMyList = () => {
    const list = readMyList();
    const exists = list.includes(video.id);
    const next = exists ? list.filter(x => x !== video.id) : [...list, video.id];
    saveMyList(next);
    setInMyList(!exists);
  };

  const percent = video.durationSeconds ? Math.min(100, Math.round((watched / video.durationSeconds) * 100)) : null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={video.title}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <div>
            <h2 className={styles.title}>{video.title}</h2>
            <div className={styles.metaHeader}>
              <span className={styles.badge}>{video.year || '—'}</span>
              {video.rating && <span className={styles.badge}>{video.rating}</span>}
              {video.duration && <span className={styles.duration}>{video.duration}</span>}
              {video.genres && <span className={styles.genres}>{video.genres.join(' · ')}</span>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              className={styles.btnGhost}
              onClick={toggleMyList}
              aria-pressed={inMyList}
            >
              {inMyList ? 'Remover da Minha Lista' : 'Adicionar à Minha Lista'}
            </button>

            <button className={styles.close} onClick={onClose} aria-label="Fechar">✕</button>
          </div>
        </header>

        <div className={styles.body}>
          <div className={styles.playerWrap}>
            {playing ? (
              <iframe
                title={video.title}
                src={embedSrc(true, Math.floor(watched) || Math.floor(video.startAt || 0))}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className={styles.preview}>
                <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} />
                <button className={styles.playLarge} onClick={() => setPlaying(true)} aria-label="Assistir">▶ Assistir</button>
                {watched > 0 && (
                  <div className={styles.smallProgress}>
                    <div className={styles.smallBar} style={{ width: percent != null ? `${percent}%` : '20%' }} />
                    <div className={styles.smallText}>Retomar em {fmtTime(watched)}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.meta}>
            <p className={styles.desc}>{video.description}</p>

            {video.cast && (
              <div>
                <strong>Elenco:</strong>
                <div className={styles.cast}>{video.cast.join(', ')}</div>
              </div>
            )}

            <div className={styles.actions}>
              {!playing && (
                <button className={styles.btnPrimary} onClick={() => setPlaying(true)}>▶ Assistir</button>
              )}
              <button className={styles.btnGhost} onClick={() => {
                const stored = readProgressFromStorage();
                stored[video.id] = watched;
                saveProgressToStorage(stored);
                onClose();
              }}>Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}