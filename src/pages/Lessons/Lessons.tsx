import React from 'react';
import { Link } from 'react-router-dom';
import './Lessons.css'; // Import the CSS file

const Lessons: React.FC = () => {
  return (
    <div>
      <div className="lesson-header">
        <h1>Lessons Page</h1>
      </div>
      <div className="box-group">
      <Link to="https://docs.google.com/presentation/d/1fOrGD9_N6cp47BaIT1sSHx2h0qC38HQUlx_M12SNrE0/edit?usp=sharing" className="box">
        Slide 1
      </Link>
      <Link to="https://docs.google.com/presentation/d/1H9ZpO3ZfuatcmNJV0FzA38bmFxUKDMSWlGr6LjYZ32M/edit#slide=id.p" className="box">
        Slide 2
      </Link>
      <Link to="https://docs.google.com/presentation/d/1XHRp7V5hILqqFR2vVAO1RL2pNhFTubAc_7PJrZnGgbc/edit?usp=sharing" className="box">
        Slide 3
      </Link>
      <Link to="https://docs.google.com/presentation/d/1ecv8UKGo9G1_hIFOTe5wmHCs6L3uMeJOkaxR1sl13Ew/edit?usp=sharing" className="box">
        Slide 4
      </Link>
    </div>
    </div>
  );
};

export default Lessons;
