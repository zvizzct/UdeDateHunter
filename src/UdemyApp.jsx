import { useState } from 'react';
import { InputField, CourseTime } from './components';

export const UdemyApp = () => {
  const [course, setCourse] = useState({});

  const handleCourse = (course) => {
    setCourse(course);
  };
  return (
    <div className="container">
      <h1>Udemy Course Date Hunter</h1>
      <InputField onNewCourse={handleCourse} />
      <CourseTime course={course} />
    </div>
  );
};
