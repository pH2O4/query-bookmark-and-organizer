import React, { useState } from 'react';
import Calendar from 'react-calendar';

function CalendarComponent(props) {
  const [value, onChange] = useState(new Date());

  const ChekingConultsOnThisDay = () => {
    
  } 
  return (
    <div>
      <Calendar onClickDay={() => ChekingConultsOnThisDay()} onChange={onChange} value={value} />
    </div>
  );
}

export default CalendarComponent