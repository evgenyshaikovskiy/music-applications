const defaultStyles = {};

const ApplicationSelect = ({
  options,
  defaultValueName,
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
      <option disabled={isDefaultDisabled} value={defaultValue}>
        {defaultValueName}
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
