<template>
  <div>
    <h1>{{ entry.title }}</h1>
    <div v-html="entry.body" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      entry: {},
    };
  },
  mounted() {
    console.log(this.entry.status, this.$preview);
    // only access for preview mode
    if (this.entry.status === "disabled" && !this.$preview) {
      return this.$nuxt.error({ statusCode: 404, message: "Page not found" });
    }
  },
  async asyncData({ $axios, route, params }) {
    let headers = {};
    const { slug } = params;
    const { token } = route.query;
    // if craft preview send token
    if (token !== undefined) {
      headers = {
        "x-Craft-Token": token ? `${token}` : "",
      };
    }
    // axios query with graphql
    const { data } = await $axios.$post(
      process.env.API_URL,
      {
        query: `
            query BlogPost {
                entry(slug: "${slug}", status: ["live", "disabled"]) {
                    title
                    body
                    status
                }
            }
        `,
      },
      { headers }
    );

    const { entry } = data;
    return { entry: entry || {} };
  },
};
</script>
