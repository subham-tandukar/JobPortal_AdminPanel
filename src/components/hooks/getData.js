export const Fetchdata = async (dataToSend) => {
  if (dataToSend.Type === "POST") {
    const response = await fetch(dataToSend.FetchURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    const cooptive = await response.json();
    return cooptive;
  } else {
    const response = await fetch(dataToSend.FetchURL);
    const cooptive = await response.json();
    return cooptive;
  }
};
