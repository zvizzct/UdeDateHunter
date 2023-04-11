import { useState } from 'react';
import { InputField, CourseTime } from './components';

export const UdemyApp = () => {
  const [createdDate, setCreatedDate] = useState('');
  const [lastDate, setLastDate] = useState('');

  const handleDate = (newCreatedDate, newLastDate) => {
    setCreatedDate(newCreatedDate);
    setLastDate(newLastDate);
  };
  return (
    <div>
      <InputField onNewDate={handleDate} />
      <CourseTime createdDate={createdDate} lastDate={lastDate} />
    </div>
  );
};
