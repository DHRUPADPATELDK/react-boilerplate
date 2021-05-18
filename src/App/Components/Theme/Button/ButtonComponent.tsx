import React from 'react';

const Button = (props: any) => (
  <button {...props} className={`btn ${props.className}`}>
    {props.children}
  </button>
);

export default Button;
