const axios = require("axios");
require("dotenv").config();

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  ZOHO_API_DOMAIN,
} = process.env;

// 🔑 Genera un nuevo access_token usando el refresh_token
async function getAccessToken() {
  try {
    const response = await axios.post(
      `https://accounts.zoho.com/oauth/v2/token`,
      null,
      {
        params: {
          refresh_token: REFRESH_TOKEN,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "refresh_token",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("❌ Error obteniendo token de Zoho:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getAccessToken };
