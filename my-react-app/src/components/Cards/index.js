import styles from './Cards.module.css';

export default function Cards({ videos = [] }) {
  if (!videos.length) return null;

  return (
    <>
      {videos.map((v) => (
        <article className={styles.card} key={v.id}>
          <div className={styles.player}>
            <iframe
              title={v.title}
              src={`https://www.youtube.com/embed/${v.id}?rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className={styles.info}>
            <h3 className={styles.title}>{v.title}</h3>
            {v.description && <p className={styles.desc}>{v.description}</p>}
          </div>
        </article>
      ))}
    </>
  );
}