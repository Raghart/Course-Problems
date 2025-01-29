import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
      {!visible && <button onClick={toggleVisibility}>{buttonLabel}</button>}
      {visible && (
        <div>
          {children}
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Togglable;