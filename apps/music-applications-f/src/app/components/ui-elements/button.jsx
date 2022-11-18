const defaultStyles = {
  padding: '5px 15px',
  margin: '10px 10px 7px 7px',
  fontSize: '14px',
  background: 'transparent',
  backgroundColor: '#CC66FF',
  borderRadius: '4px',
  border: '2px solid #660099',
  cursor: 'pointer',
  color: '#003333'
};

const ApplicationButton = ({ children, styles, ...props }) => {
  return (
    <button {...props} style={{ ...defaultStyles, ...styles }}>
      {children}
    </button>
  );
};

export default ApplicationButton;
