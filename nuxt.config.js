export default {
  target: "static",
  modules: ["@nuxtjs/axios"],
  plugins: ["plugins/preview.client.js"],
  generate: {
    fallback: true,
    exclude: require("./preGenerate/exclude.json"),
    // routes(callback) {
    //   axios
    //     .post(process.env.API_URL, {
    //       query: `
    //           query BlogPosts {
    //               entries( type: "blog", status: ["disabled"]) {
    //                   uri
    //                   title
    //                   body
    //                   status
    //               }
    //           }
    //       `,
    //     })
    //     .then((res) => {
    //       const { data } = res.data;
    //       const routes = data.entries.map((entry) => {
    //         return { route: entry.uri, payload: entry };
    //       });
    //       callback(null, routes);
    //     })
    //     .catch(callback);
    // },
  },
};
