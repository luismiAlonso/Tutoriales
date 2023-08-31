import { useState, useEffect } from 'react';

export function useDate(initialDate) {
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    setDate(initialDate);
  }, [initialDate]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return { date, handleDateChange };
}
