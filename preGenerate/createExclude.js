/**
 * Create array of exclude url for no live articles
 */
const fs = require("fs");
const axios = require("axios");
// dot env is on nuxt
const dotEnv = require("dotenv");

const getExcludes = async () => {
  const { data } = await axios.post(
    process.env.API_URL || dotEnv.config("../.env").parsed.API_URL,
    {
      query: `
              query EntriesDisabled {
                  entries(status: ["disabled"]) {
                      uri
                  }
              }
          `,
    }
  );
  const exclude = data.data.entries.map((entry) => {
    return entry.uri;
  });

  fs.writeFileSync("exclude.json", JSON.stringify(exclude));
};

getExcludes();
