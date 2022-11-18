const defaultStyles = {
  padding: '5px 15px',
  margin: '5px 0',
  border: '1.5px solid',
  borderRadius: '6px',
};

const ApplicationInput = ({ styles, ...props }) => {
  return <input style={{ ...defaultStyles, ...styles }} {...props}></input>;
};

export default ApplicationInput;
