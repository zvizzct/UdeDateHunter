import React, { useState } from 'react';
import { getTime } from '../helpers/getTime';

export const InputField = ({ onNewCourse }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    onNewCourse({});
    const course = await getTime(input);
    onNewCourse(course);
    setIsLoading(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="https://www.udemy.com/course/100-days-of-code/"
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && (
        <div className="loader-container">
          <p>This can take a couple of seconds to load</p>
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
};
