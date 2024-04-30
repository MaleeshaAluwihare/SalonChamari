import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/chavidu/btn1.css';

const ButtonLink = ({ to, className, children }) => {
  return (
    <Link to={to} className={`button-5 ${className}`}>
      {children}
    </Link>
  );
};

export default ButtonLink;
