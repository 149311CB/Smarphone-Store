import React from "react";
import PropTypes from "prop-types";

const Button = ({
  text,
  backgroundColor,
  color,
  border,
  outline,
  cursor,
  width,
}) => {
  return (
    <button
      style={{
        backgroundColor: `${backgroundColor}`,
        color: `${color}`,
        border: `${border}`,
        outline: `${outline}`,
        cursor: `${cursor}`,
        width: `${width}`,
      }}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  backgroundColor: "#323d43",
  color: "#a7c080",
  border: "none",
  outline: "none",
  cursor: "pointer",
  width: "100px",
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  outline: PropTypes.string,
  cursor: PropTypes.string,
  width: PropTypes.string,
};

export default Button;
