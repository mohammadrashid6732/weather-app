const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "8a07319f66515d38204ea25ece2ab72b";

const getWeatherData = async (type, data) => {
  let url = null;
  switch (type) {
    case "current":
      if (typeof data === "string") {
        url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric `;
      } else {
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric `;
      }
      break;
    case "forecast":
      if (typeof data === "string") {
        url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric `;
      } else {
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric `;
      }
      break;
    default:
      url = `${BASE_URL}/weather?q=malard&appid=${API_KEY}&units=metric `;
  }
  try {
    const response = await fetch(url);
    const json = response.json();
    return json;
    // if (+json.code === 200) {
    //   return json;
    // } else {
    //   console.log(json.message);
    // }
  } catch (error) {
    console.log("An error occurred when fetching data:", error);
  }
};

export default getWeatherData;
