const defaultStyles = {};

const ApplicationSelect = ({
  options,
  defaultValue,
  value,
  onChange,
  styles,
  isDefaultDisabled,
}) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={{ ...defaultStyles, ...styles }}
    >
      <option disabled={isDefaultDisabled} value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default ApplicationSelect;
