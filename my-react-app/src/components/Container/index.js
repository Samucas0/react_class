import React, { useRef, useState, useEffect } from 'react';
import styles from './Container.module.css';

export default function Container({ title, children }) {
  const ref = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 8);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    };
    update();
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [children]);

  const pageScroll = (direction = 1) => {
    const el = ref.current;
    if (!el) return;
    const width = el.clientWidth;
    el.scrollBy({ left: direction * width, behavior: 'smooth' });
  };

  return (
    <section className={styles.section} aria-labelledby={title ? title.replace(/\s+/g, '-') : undefined}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.wrapper}>
        <button className={`${styles.navBtn} ${styles.left}`} onClick={() => pageScroll(-1)} aria-hidden={!canLeft} disabled={!canLeft}>
          ‹
        </button>

        <div className={styles.carousel} ref={ref} role="list">
          {children}
        </div>

        <button className={`${styles.navBtn} ${styles.right}`} onClick={() => pageScroll(1)} aria-hidden={!canRight} disabled={!canRight}>
          ›
        </button>
      </div>
    </section>
  );
}