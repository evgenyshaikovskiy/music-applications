import cl from './modal.module.css';

const AppModal = ({ children, visible, setVisible }) => {
  const rootClasses = [cl.appModal];

  if (visible) {
    rootClasses.push(cl.active);
  }

  return (
    <div className={rootClasses.join(' ')}>
      <div className={cl.appModalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default AppModal;
