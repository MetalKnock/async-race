import React from 'react';

interface ButtonProps {
  className: string;
  title: string;
  type?: 'button' | 'submit';
  disabled: boolean;
  handleClick: () => void | Promise<void>;
}

function Button({ className, title, type, disabled, handleClick }: ButtonProps) {
  return (
    <button
      className={className}
      type={type === 'button' ? 'button' : 'submit'}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
};

export default Button;
