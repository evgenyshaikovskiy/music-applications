import React from 'react';

const defaultStyles = {
  background: 'transparent',
  borderRadius: '3px',
};

const ApplicationSelect = ({
  options,
  defaultValue,
  value,
  onChange,
  styles,
}) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={{ ...defaultStyles, ...styles }}
    >
      <option disabled value="">
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
