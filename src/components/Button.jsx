import { Link } from 'react-router';
import styles from './Interface.module.css';
export default function Button({ children, secondary = false, to, type = 'button', ...props }) {
  const className = secondary ? styles.secondaryButton : styles.button;
  return to ? (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) : (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
}
