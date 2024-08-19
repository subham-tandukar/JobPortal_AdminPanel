import React, { useEffect, useState, useRef } from "react";
import { MdClose } from "react-icons/md";

const MyImageUploader = ({
  Image,
  setIsUploaded,
  IsUploaded,
  setImage,
  setFile,
  filename,
  setFilename,
}) => {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef(null);

  useEffect(() => {
    const handleDocumentDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDocumentDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Adding event listeners to the document
    document.addEventListener("dragover", handleDocumentDragOver);
    document.addEventListener("drop", handleDocumentDrop);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("dragover", handleDocumentDragOver);
      document.removeEventListener("drop", handleDocumentDrop);
    };
  }, []);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
      base64Img(e.dataTransfer);
    }
  };

  // triggers when file is selected with click
  const handleImageChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
      base64Img(e.target);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  // To convert img into base64 string
  const base64Img = (e) => {
    let reader = new FileReader();

    reader.onload = function (e) {
      setImage(e.target.result);
      setIsUploaded(true);
    };

    reader.readAsDataURL(e.files[0]);
  };

  const handleFile = (files) => {
    setFile(files);
    setFilename(files.name);
  };

  return (
    <>
      <div className="th-file-uploder" onDragEnter={handleDrag}>
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          onChange={handleImageChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <p>Drag and drop your file here or</p>
            <span className="upload-button" onClick={onButtonClick}>
              Upload a file
            </span>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </div>

      {IsUploaded && (
        <div className="th-file-preview mt-2">
          <img
            id="uploaded-image"
            src={Image}
            draggable={false}
            alt={filename}
          />

          <span className="th-file-name">{filename}</span>

          <MdClose
            className="close-icon"
            onClick={() => {
              setIsUploaded(false);
              setImage(null);
            }}
          />
        </div>
      )}
    </>
  );
};

export default MyImageUploader;
