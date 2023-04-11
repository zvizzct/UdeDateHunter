// coursetime.jsx
import React from 'react';

export const CourseTime = ({ course }) => {
  const { error, createdDate, lastDate, title, image } = course;

  if (error) {
    return (
      <div className="error">
        <p
          dangerouslySetInnerHTML={{ __html: error.replace(/\n/g, '<br />') }}
        ></p>
      </div>
    );
  }

  return (
    <>
      {createdDate && lastDate && (
        <div className="course-info">
          <h2>{title}</h2>
          <img src={image}></img>
          <div className="dates">
            <div className="created">
              <p className="date-created">Created: {createdDate}</p>
            </div>
            <div className="last">
              <p className="date-last">Last Update: {lastDate}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
