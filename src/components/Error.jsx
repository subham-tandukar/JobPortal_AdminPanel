import React from "react";

const Error = ({ error }) => {
  return (
    <>
      {error && (
        <span className="th-error error">
          {error.Message || "Something went wrong"}
        </span>
      )}
    </>
  );
};

export default Error;
