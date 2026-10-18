import styles from './Interface.module.css';

export default function CodeBlock({ filename, children }) {
  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeading}>
        <span>{filename}</span>
        <span>JavaScript</span>
      </div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}
