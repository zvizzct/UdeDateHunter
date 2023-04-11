import React from 'react';

export const CourseTime = ({ createdDate, lastDate }) => {
  return (
    <>
      {createdDate && lastDate && (
        <>
          <h1>Course Time</h1>
          <p>Created: {createdDate}</p>
          <p>Last Date: {lastDate}</p>
        </>
      )}
    </>
  );
};
