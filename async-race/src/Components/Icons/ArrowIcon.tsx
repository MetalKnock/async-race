import React from 'react';

interface ArrowIconProps {
  className: string;
}

function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g
        stroke="#292929"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        clipPath="url(#clip0_429_11251)"
      >
        <path d="M7 10l5 5M12 15l5-5" />
      </g>
      <defs>
        <clipPath id="clip0_429_11251">
          <path fill="#fff" d="M0 0H24V24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ArrowIcon;
