import cl from './modal.module.css';

const AppModal = ({ children, visible, setVisible, notHideOnClick }) => {
  const rootClasses = [cl.appModal];

  if (visible) {
    rootClasses.push(cl.active);
  }

  return (
    <div
      className={rootClasses.join(' ')}
      onClick={() => {
        if (!notHideOnClick) {
          setVisible(false);
        }
      }}
    >
      <div className={cl.appModalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default AppModal;
