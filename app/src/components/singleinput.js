import React from "react";
import PropTypes from "prop-types";

const SingleInput = props => {
  return (
    <div className="form-group">
      <label className="form-label">{props.title}</label>
      <input
        className="form-input"
        name={props.name}
        type={props.inputType}
        value={props.content}
        onChange={props.controlFunc}
        placeholder={props.placeholder}
        pattern={props.pattern}
      />
    </div>
  );
};

// SingleInput.PropTypes={
//     inputType: React.PropTypes.oneOfType(['text', 'number']).isRequired,
// 	title: React.PropTypes.string.isRequired,
// 	name: React.PropTypes.string.isRequired,
// 	controlFunc: React.PropTypes.func.isRequired,
// 	content: React.PropTypes.oneOfType([
// 		React.PropTypes.string,
// 		React.PropTypes.number,
// 	]).isRequired,
// 	placeholder: React.PropTypes.string,

// }

export default SingleInput;
