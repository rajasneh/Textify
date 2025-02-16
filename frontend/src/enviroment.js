const IS_PROD = true;
const server = IS_PROD
  ? "https://textifybackend-9z34.onrender.com/api" // ✅ Backend URL
  : "http://localhost:5001"; // ✅ Local Backend

export default server;
