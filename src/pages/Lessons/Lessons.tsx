import React from 'react';
import { Link } from 'react-router-dom';
import './Lessons.css'; // Import the CSS file

const Lessons: React.FC = () => {
  return (
    <div>
      <h1>Lessons Page</h1>
      <div className="button-container">
        <Link to="/slide/1">
          <button className="lesson-button">Slide 1</button>
        </Link>
        <Link to="/slide/2">
          <button className="lesson-button">Slide 2</button>
        </Link>
        <Link to="/slide/3">
          <button className="lesson-button">Slide 3</button>
        </Link>
        <Link to="/slide/4">
          <button className="lesson-button">Slide 4</button>
        </Link>
      </div>
    </div>
  );
};

export default Lessons;
