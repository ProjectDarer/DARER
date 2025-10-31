// config.js
const ENV = window.location.hostname === "localhost" ? "development" : "production";

const CONFIG = {
  development: {
    API_URL: "http://localhost:3000",
  },
  production: {
    API_URL: "https://mybackendapp.com",
  },
};

export default CONFIG[ENV];
