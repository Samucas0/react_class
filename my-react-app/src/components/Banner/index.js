import React, { useEffect, useState } from 'react';
import styles from './Banner.module.css';
import videosData from '../../data/videos';

export default function Banner() {
  // filtra apenas vídeos com id plausível (evita ids inválidos que quebram o embed)
  const videos = (videosData.featured || []).filter(
    v => v && typeof v.id === 'string' && /^[A-Za-z0-9_-]{8,}$/.test(v.id)
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!videos.length) return;
    // troca mais devagar: 10s
    const t = setInterval(() => {
      setIdx(i => (i + 1) % videos.length);
    }, 10000);
    return () => clearInterval(t);
  }, [videos.length]);

  const current = videos[idx] || {};

  return (
    <header className={styles.banner} role="banner" aria-label="Destaque Samu Max">
      <div className={styles.playerWrap}>
        {current.id ? (
          <iframe
            className={styles.iframe}
            title={current.title || 'Samu Max'}
            src={`https://www.youtube.com/embed/${current.id}?rel=0&autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className={styles.placeholder} />
        )}

        <div className={styles.overlay}>
          <div className={styles.info}>
            <h2 className={styles.title}>{current.title || 'Samu Max'}</h2>
            {current.description && <p className={styles.desc}>{current.description}</p>}
          </div>
          <div className={styles.dots}>
            {videos.map((v, i) => (
              <button
                key={v.id + i}
                className={`${styles.dot} ${i === idx ? styles.activeDot : ''}`}
                onClick={() => setIdx(i)}
                aria-label={`Ir para ${v.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
