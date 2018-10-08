import React from 'react';
import PropTypes from 'prop-types';

import { IError } from 'Models';

function Errors(props) {
  const { errors } = props;

  return (
    <div className="alert alert-danger" role="alert">
      {errors.map((error, index) => <p key={index}>{error.message}</p>)}
    </div>
  );
}

Errors.propTypes = {
  errors: PropTypes.arrayOf(IError),
};

Errors.defaultProps = {
  errors: [],
};

export default Errors;
