import axios from "axios";

// export const baseURL = process.env.REACT_APP_URL;
export const baseURL = "http://localhost:8009";

// Reusable function to handle API requests
export const apiRequest = async (url, data, thunkAPI) => {
  try {
    const response = await axios.post(`${baseURL}/api/admin/${url}`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // If the error status is 422, extract the error message from the response data
      return thunkAPI.rejectWithValue(error.response.data);
    } else {
      // For other errors, simply reject with the error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
};
export const apiFormRequest = async (url, data, thunkAPI) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await axios.post(`${baseURL}/api/admin/${url}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // If the error status is 422, extract the error message from the response data
      return thunkAPI.rejectWithValue(error.response.data);
    } else {
      // For other errors, simply reject with the error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
};
export const apiFormHeaderRequest = async (url, data, token, thunkAPI) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const response = await axios.post(`${baseURL}/api/admin/${url}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // If the error status is 422, extract the error message from the response data
      return thunkAPI.rejectWithValue(error.response.data);
    } else {
      // For other errors, simply reject with the error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
};

export const apiGetRequest = async (url, thunkAPI) => {
  try {
    const response = await axios.get(`${baseURL}/api/admin/${url}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // If the error status is 422, extract the error message from the response data
      return thunkAPI.rejectWithValue(error.response.data);
    } else {
      // For other errors, simply reject with the error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
};

export const apiHeaderRequest = async (url, data, token, thunkAPI) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      "Content-Type": "application/json",
    };
    const response = await axios.post(`${baseURL}/api/admin/${url}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // If the error status is 422, extract the error message from the response data
      return thunkAPI.rejectWithValue(error.response.data);
    } else {
      // For other errors, simply reject with the error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
};

export const apiHeaderGetRequest = async (url, token, thunkAPI) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      "Content-Type": "application/json",
    };
    const response = await axios.get(`${baseURL}/api/${url}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // If the error status is 422, extract the error message from the response data
      return thunkAPI.rejectWithValue(error.response.data);
    } else {
      // For other errors, simply reject with the error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
};

// Format and modules for text editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

export const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

// To get formatted Date
export const formattedDate = (inputDate) => {
  // Create a new Date object from the input string
  const date = new Date(inputDate);

  // Month names array
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get day, month, and year from the date object
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Format the date as "MonthName day, year" (e.g., "October 27, 2017")
  const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

  return formattedDate;
};

// to get human readable timestamp
function formatDateWithTime(date) {
  const formattedDateTime = new Date(date);
  const year = formattedDateTime.getFullYear();
  const month = formattedDateTime.getMonth() + 1; // Months are zero-based, so we add 1
  const day = formattedDateTime.getDate();
  const formattedDay = formattedDate(date);
  const hours = formattedDateTime.getHours();
  let minutes = formattedDateTime.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  // Convert hours from 24-hour format to 12-hour format
  const displayHours = hours % 12 || 12;
  // Ensure minutes are displayed with leading zero if less than 10
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${formattedDay} | ${displayHours}:${minutes} ${ampm}`;
}

// to get timestamp
export function timeAgo(timestamp) {
  const currentTime = Date.now();
  const createdAtTime = new Date(timestamp).getTime();
  const timeDifference = currentTime - createdAtTime;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (days === 1) {
    return "1 day ago";
  } else {
    // For a timestamp older than 1 day, show the time and date in a specific format
    const formattedDate = formatDateWithTime(timestamp);
    return `${formattedDate}`;
  }
}

