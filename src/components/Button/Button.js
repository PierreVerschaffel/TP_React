import React from 'react';

const Button = ({ children, type, onClick }) => {
  
    return (
      <button className={"btn btn-"+ type + " mx-2"} onClick={onClick}>
        {children}
      </button>
    );
  };

export default Button;