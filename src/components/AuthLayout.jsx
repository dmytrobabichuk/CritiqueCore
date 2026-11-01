import { Link } from 'react-router';
import styles from './AuthLayout.module.css';

export default function AuthLayout({ children }) {
  return (
    <main className={styles.layout}>
      <section className={styles.intro}>
        <Link to="/" className={styles.brand}>
          <span aria-hidden="true">{'</>'}</span>CritiqueCore
        </Link>
        <div className={styles.message}>
          <p className={styles.eyebrow}>�ϲ������ ��� ����������� ����</p>
          <h2>
            ������� ���
            <br />
            ����������
            <br />� �����������.
          </h2>
          <p>������ ���������, ������� ������ �� ������� ��������� ����� �� ������� �����.</p>
        </div>
        <small className={styles.footer}>��� ��������, ������� � ����������.</small>
      </section>
      <section className={styles.formArea}>
        <div className={styles.formContent}>{children}</div>
      </section>
    </main>
  );
}
