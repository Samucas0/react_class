import React, { useState } from 'react';
import styles from './Cards.module.css';
import VideoModal from '../VideoModal';

const STORAGE_KEY = 'samu_watch_progress';
function readProgressFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (e) {
    return {};
  }
}
function saveProgressToStorage(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj || {}));
    try { window.dispatchEvent(new CustomEvent('samu_progress_update', { detail: obj })); } catch (e) { /* ignore */ }
  } catch (e) { /* ignore */ }
}

// props:
//  - videos: array of video objects
//  - progressMap: map id -> seconds watched
//  - showRemove: (existing) shows "x" to remove progress (used by Continuar assistindo)
//  - actions: optional function(video) => JSX to render extra buttons (e.g. add/remove from MyList)
export default function Cards({ videos = [], progressMap = {}, showRemove = false, actions }) {
  const [active, setActive] = useState(null);

  if (!videos || videos.length === 0) return null;

  const handleRemove = (e, vid) => {
    e.stopPropagation();
    e.preventDefault();
    const stored = readProgressFromStorage();
    if (stored && Object.prototype.hasOwnProperty.call(stored, vid)) {
      delete stored[vid];
      saveProgressToStorage(stored);
    }
  };

  return (
    <>
      {videos.map((v) => {
        const progress = progressMap[v.id] || 0;
        return (
          <article className={styles.card} key={v.id}>
            <button
              type="button"
              className={styles.thumbBtn}
              onClick={() => setActive({ ...v, startAt: Math.floor(progress) })}
              aria-label={`Abrir detalhes de ${v.title}`}
            >
              <div className={styles.thumb}>
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                />
                <div className={styles.playOverlay} aria-hidden="true">
                  <span className={styles.playIcon}>▶</span>
                </div>

                {progress > 0 && (
                  <div className={styles.progressOverlay}>
                    <div className={styles.progressBar} style={{ width: v.durationSeconds ? `${Math.min(100, Math.round((progress / v.durationSeconds) * 100))}%` : '16%' }} />
                    <div className={styles.progressText}>Retomar {Math.floor(progress / 60)}:{String(progress % 60).padStart(2, '0')}</div>
                  </div>
                )}
              </div>

              <div className={styles.cardInfo}>
                <h3 className={styles.title}>{v.title}</h3>
                <p className={styles.desc}>{v.description}</p>
              </div>
            </button>

            {/* custom actions (Add/Remove MyList) */}
            {actions && (
              <div className={styles.cardActions}>
                {actions(v)}
              </div>
            )}

            {/* botão remover: aparece apenas quando showRemove === true e há progresso */}
            {showRemove && progress > 0 && (
              <button
                className={styles.removeBtn}
                onClick={(e) => handleRemove(e, v.id)}
                aria-label={`Remover ${v.title} de continuar assistindo`}
                title="Remover de Continuar assistindo"
              >
                ✕
              </button>
            )}
          </article>
        );
      })}

      {active && (
        <VideoModal
          video={active}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}