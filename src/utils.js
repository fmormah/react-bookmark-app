import axios from "axios";

// Helpers to by-pass CORS/Header protocols (Free version of API will have watermarks)
export const linkImageGrabber =
  "http://free.pagepeeker.com/v2/thumbs.php?size=x&url=";
export const proxyUrl = "https://phrost-cors.herokuapp.com/";

const urlCheckTimeOutLimit = 3000; //ms

export const checkForHttp = (url) => {
  if (!url.match(/^[a-zA-Z]+:\/\//)) return (url = "http://" + url);
  return url;
};

export const imageToDataURL = async (imageUrl, stateSetter) => {
  // Fetch the image from the provided URL
  const response = await fetch(imageUrl);
  const imageBlob = await response.blob();

  // Create a new FileReader object
  const reader = new FileReader();

  // When the image is loaded
  reader.onload = (event) => {
    // Get the data URL of the image
    const dataURL = event.target.result;
    stateSetter(dataURL);
  };

  // Read the image as a data URL
  reader.readAsDataURL(imageBlob);
};

export const validateURL = (url) => {
  // Regular expression to check for a valid URL
  const regex =
    /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  // Check if the URL matches the regex
  if (regex.test(url)) {
    return true;
  } else {
    return false;
  }
};

export const isValidAndExistsURL = ({ url, stateSetter, alertHandler }) => {
  if (url === "") {
    alertHandler(`🔭 Can't bookmark empty space 🪐`, true);
    return;
  }
  url = checkForHttp(url);

  if (validateURL(url) === false) {
    alertHandler(`That URL looks weird...`, true);
  }

  return axios
    .get(proxyUrl + url, { timeout: urlCheckTimeOutLimit })
    .then((response) => {
      if (response.status === 200) {
        stateSetter(true);
      } else {
        alertHandler(`Site can't be reached 🙅🏽‍♀️`, true);
      }
    })
    .catch((error) => {
      alertHandler(`Site can't be reached 🙅🏽‍♀️`, true);
      console.warn(error);
    });
};
