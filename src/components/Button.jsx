import { Link } from 'react-router';
import styles from './Interface.module.css';

export default function Button({ children, secondary = false, to }) {
  const className = secondary ? styles.secondaryButton : styles.button;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
}
