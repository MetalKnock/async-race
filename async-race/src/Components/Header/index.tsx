import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Garage</Link>
          </li>
          <li>
            <Link to="/winners">Winners</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
