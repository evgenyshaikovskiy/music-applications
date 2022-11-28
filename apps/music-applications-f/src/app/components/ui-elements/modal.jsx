import styles from './modal.module.css';

const ApplicationModal = ({ children, visible, setVisible }) => {
  const rootClasses = [styles.modalWindow];

  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div
        className={styles.modalWindowContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ApplicationModal;
