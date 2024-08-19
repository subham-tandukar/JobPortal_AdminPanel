import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const MyDatePicker = ({ value, onChange }) => {
  return (
    <>
      <DatePicker
        onChange={onChange}
        value={value}
        calendarIcon={<FaRegCalendarAlt color="#202124" />}
        clearIcon={<MdClose color="#d7001b" />}
        dayPlaceholder="dd"
        monthPlaceholder="mm"
        yearPlaceholder="yyyy"
        minDate={new Date()}
      />
    </>
  );
};

export default MyDatePicker;
