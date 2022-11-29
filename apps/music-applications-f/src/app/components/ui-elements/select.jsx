const ApplicationSelect = ({
  options,
  defaultValueName,
  defaultValue,
  value,
  onChange,
  isDefaultDisabled,
  selectorClassName,
}) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={selectorClassName}
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
