import { Link } from 'react-router';
import styles from './Interface.module.css';

export default function TopicCard({ author, title, description, tags, status, to }) {
  return (
    <article className={styles.topicCard}>
      <p className={styles.meta}>{author}</p>
      <h2>
        {to ? (
          <Link to={to} className={styles.topicLink}>
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      <p>{description}</p>
      <div className={styles.tags}>
        <span>{tags}</span>
        <span className={styles.status}>{status}</span>
      </div>
    </article>
  );
}
