import "./button.css";

const Button = ({ text = "Submit" }) => {
  return (
    <button className="btn" type="submit">
      {text}
    </button>
  );
};

export default Button;
