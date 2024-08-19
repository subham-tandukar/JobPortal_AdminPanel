import React from "react";

const PageHeading = ({ title, subTitle }) => {
  return (
    <>
      <h1 className="th-heading">{title}</h1>
      <span className="th-subheading">{subTitle}</span>
    </>
  );
};

export default PageHeading;
