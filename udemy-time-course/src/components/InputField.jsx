import React, { useState } from 'react';
import { getTime } from '../helpers/getTime';

export const InputField = ({ onNewDate }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { created, lastDate } = await getTime(input);
    onNewDate(created, lastDate);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
};
