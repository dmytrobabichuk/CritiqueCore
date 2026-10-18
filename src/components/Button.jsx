import styles from './Interface.module.css';

export default function Button({ children, secondary = false }) {
  return (
    <button type="button" className={secondary ? styles.secondaryButton : styles.button}>
      {children}
    </button>
  );
}
