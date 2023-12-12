import React from 'react';

const Button = ({ children, type, onClick, CSSclass }) => {
  
    return (
      <button className={type!==""?"btn btn-"+ type : CSSclass} onClick={onClick}>
        {children}
      </button>
    );
  };

export default Button;