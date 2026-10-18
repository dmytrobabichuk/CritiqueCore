import styles from './Interface.module.css';

export default function Panel({ title, children }) {
  return (
    <section className={styles.panel}>
      {title && <h2 className={styles.panelTitle}>{title}</h2>}
      {children}
    </section>
  );
}
