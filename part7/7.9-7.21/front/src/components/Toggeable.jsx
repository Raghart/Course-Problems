import React, { useState } from "react";
import PropTypes from "prop-types";
import { ButtonStyle } from "../styles";

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
      {!visible && <button style={ButtonStyle} onClick={toggleVisibility}>{buttonLabel}</button>}
      {visible && (
        <div>
          {children}
          <button style={ButtonStyle} onClick={toggleVisibility}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Togglable;
