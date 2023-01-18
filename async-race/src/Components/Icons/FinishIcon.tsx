import React from 'react';

interface CarIconProps {
  className: string;
}

function FinishIcon({ className }: CarIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      fill="#000"
      stroke="#000"
      strokeWidth="0.005"
      version="1.1"
      viewBox="0 0 511.99 511.99"
      xmlSpace="preserve"
    >
      <g>
        <path
          fill="#E6E9ED"
          d="M441.833 66.06a10.68 10.68 0 00-11.359 1.484c-24.045 20.11-53.045 30.75-83.827 30.75-30.482 0-60.311-10.921-83.998-30.75-27.889-23.249-61.529-35.546-97.31-35.546-34.78 0-68.857 12.266-96.139 34.562-3.125 1.875-5.202 5.281-5.202 9.172v232.525c0 4.141 2.39 7.906 6.14 9.656a10.672 10.672 0 0011.359-1.484c24.031-20.093 53.03-30.702 83.842-30.702s59.796 10.609 83.826 30.718c27.468 22.922 62.093 35.547 97.481 35.547 34.781 0 68.858-12.266 96.139-34.578a10.666 10.666 0 005.203-9.156V75.732a10.702 10.702 0 00-6.155-9.672z"
        />
        <g fill="#434A54">
          <path d="M351.991 351.898c32.906-1.188 64.921-13.312 90.795-34.484a10.666 10.666 0 005.203-9.156V75.732c0-4.141-2.406-7.906-6.156-9.672a10.68 10.68 0 00-11.359 1.484c-22.655 18.953-49.686 29.468-78.482 30.64l-.001 253.714h0zM255.806 62.154c-26.468-19.749-57.562-30.155-90.467-30.155-1.781 0-3.562.047-5.344.109v253.729c1.766-.078 3.547-.109 5.344-.109 30.812 0 59.796 10.609 83.826 30.718a150.278 150.278 0 006.641 5.219V62.154z" />
        </g>
        <path
          fill="#E6E9ED"
          d="M69.201 66.56c-3.125 1.875-5.202 5.281-5.202 9.172v232.525c0 4.141 2.39 7.906 6.14 9.656a10.672 10.672 0 0011.359-1.484c22.641-18.921 49.687-29.437 78.498-30.593h0V32.108c-32.905 1.188-64.904 13.297-90.795 34.452z"
        />
        <path
          fill="#434A54"
          d="M156.152 161.668c-32.671 0-64.779 8.938-92.153 25.405v121.185c0 4.141 2.39 7.906 6.14 9.656a10.672 10.672 0 0011.359-1.484c22.641-18.921 49.687-29.437 78.498-30.593h0V161.715a153.96 153.96 0 00-3.844-.047z"
        />
        <g fill="#E6E9ED">
          <path d="M255.806 321.664V191.839c-28.124-19.062-60.983-29.421-95.811-30.124v124.122c1.766-.078 3.547-.109 5.344-.109 30.812 0 59.796 10.609 83.826 30.718a150.843 150.843 0 006.641 5.218zM447.989 308.258V197.354c-26.452 20.016-58.311 30.609-92.154 30.609-1.281 0-2.562-.031-3.844-.062v123.998c32.906-1.188 64.921-13.312 90.795-34.484a10.67 10.67 0 005.203-9.157z" />
        </g>
        <path
          fill="#ED5564"
          d="M74.654 511.988a10.648 10.648 0 01-10.655-10.656V10.671C63.999 4.78 68.764 0 74.654 0s10.672 4.781 10.672 10.671v490.661c0 5.891-4.781 10.656-10.672 10.656z"
        />
        <path
          fill="#434A54"
          d="M351.991 227.901c-32.232-.797-63.576-11.609-88.67-30.687a179.37 179.37 0 00-7.515-5.375v129.825c26.312 19.609 58.249 30.328 90.841 30.328 1.781 0 3.562-.031 5.344-.094V227.901z"
        />
      </g>
    </svg>
  );
}

export default FinishIcon;