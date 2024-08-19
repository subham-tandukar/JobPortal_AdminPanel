import React from "react";
import { MdClose } from "react-icons/md";
import Select from "react-select";
import { components } from "react-select";

const MySelect = ({ dropDownValue, onChange, value, placeholder }) => {
  const handleOnChange = (option) => {
    onChange(option);
  };

  const ClearIndicator = (props) => {
    return (
      <components.ClearIndicator {...props}>
        <MdClose style={{ color: "#d7001b", cursor: "pointer" }} />{" "}
        {/* Customize the icon and its style */}
      </components.ClearIndicator>
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#f5f7fc",
      border: "none",
      minHeight: "48px",
      paddingLeft: "0.5rem",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#202124",
      fontSize: "1rem",
    }),
    menu: (provided, state) => ({
      ...provided,
      background: "#f5f7fc",
      border: "solid 1px #a0a0a0a6",
      boxShadow: "none",
      lineHeight: "20px",
      fontSize: "14px",
      top: "90%",
      cursor: "pointer !important",
      zIndex: "100",
    }),

    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      fontSize: "0.875rem",
      color: "#9ca3af !important",
    }),
  };

  return (
    <>
      <Select
        placeholder={`Select ${placeholder}`}
        options={dropDownValue}
        value={value}
        onChange={handleOnChange}
        noOptionsMessage={() => "No options"}
        styles={customStyles}
        components={{ ClearIndicator }}
        isClearable
      />
    </>
  );
};

export default MySelect;
