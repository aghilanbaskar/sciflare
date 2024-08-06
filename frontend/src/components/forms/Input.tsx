import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Input: React.FC<InputProps> = ({ handleChange, label, ...props }) => {
  return (
    <div className="formRow">
      {label && <label className="formLabel">{label}</label>}
      <input className="formInput" onChange={handleChange} {...props} />
    </div>
  );
};

Input.propTypes = {};

export default Input;
