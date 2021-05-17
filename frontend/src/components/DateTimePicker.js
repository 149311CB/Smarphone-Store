import React, {useEffect, useState} from "react";

const arr = (month, year) => {
  return new Array(31)
    .fill("")
    .map((v, i) => new Date(year, month - 1, i + 1))
    .filter((v) => v.getMonth() === month - 1);
};

const DateTimePicker = ({getISODate}) => {
  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [month, setMonth] = useState(new Date().getMonth());
  const yearList = [];
  const [year, setYear] = useState(new Date().getFullYear() - 10);
  for (var i = new Date().getFullYear() - 100; i <= new Date().getFullYear(); i++) {
    yearList.push(i);
  }

  const [days, setDays] = useState(arr(month, year));
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  useEffect(() => {
    getISODate(new Date(`${year.toString()}-${month.toString()}-${selectedDate.toString()}`).toISOString())
  }, [month, year, selectedDate])

  return (
    <div className="datetimepicker" id="datetimepicker">
      <div className="select-group">
        <select
          as="select"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {days.map((x, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <img src="https://149311cbimages.s3.amazonaws.com/down.png" />
      </div>
      <div className="select-group">
        <select
          as="select"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
            setDays(arr(e.target.value, year));
          }}
        >
          {monthList.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
        <img src="https://149311cbimages.s3.amazonaws.com/down.png" />
      </div>
      <div className="select-group">
        <select
          as="select"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setDays(arr(month, e.target.value));
          }}
        >
          {yearList.map((x) => (
            <option key={x} value={x} disabled={x > new Date().getFullYear() - 10 ? true : false} >
              {x}
            </option>
          ))}
        </select>
        <img src="https://149311cbimages.s3.amazonaws.com/down.png" />
      </div>
    </div>
  );
};

export default DateTimePicker;
