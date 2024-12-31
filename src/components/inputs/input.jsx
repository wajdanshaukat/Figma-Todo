import { useState } from "react";
import "../inputs/input.css";

const Input = ({
  type,
  placeholder,
  id,
  value,
  onChange,
  toggleable,
  onToggle,
}) => {
  const [inputType, setInputType] = useState(type);

  const handleToggle = () => {
    if (toggleable) {
      setInputType((prev) => (prev === "password" ? "text" : "password"));
      if (onToggle) onToggle(inputType === "password" ? "text" : "password");
    }
  };

  return (
    <div className={toggleable ? "passwordContainer" : ""}>
      <input
        id={id}
        className="input"
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {toggleable && (
        <button
          id="togglePassword"
          className="toggle-password"
          onClick={handleToggle}
          type="button"
        >
          {inputType === "password" ? "Show" : "Hide"}
        </button>
      )}
    </div>
  );
};

export default Input;
