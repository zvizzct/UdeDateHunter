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
          <img src={image} alt={`${course.title} course image`}></img>
          <div className="dates">
            <div className="created">
              <h3 className="date-created">Created: {createdDate}</h3>
            </div>
            <div className="last">
              <h3 className="date-last">Last Update: {lastDate}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
