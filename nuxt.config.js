import axios from "axios";

export default {
  target: "static",
  modules: ["@nuxtjs/axios"],
  plugins: ["plugins/preview.client.js"],
  generate: {
    routes(callback) {
      axios
        .post(process.env.API_URL, {
          query: `
            query BlogPosts {
                entries( type: "blog", status: ["disabled"]) {
                    uri
                }
            }
        `,
        })
        .then((res) => {
          const { data } = res.data;
          const routes = data.entries.map((entry) => {
            return entry.uri;
          });
          callback(null, routes);
        })
        .catch(callback);
    },
  },
};
