<template>
  <div>
    <h1>{{ entry.title }}</h1>
    <!-- <p>{{ entry.intro }}</p> -->
    <div v-html="entry.body" />
    <!-- {{ ping }} -->
    <!-- {{ JSON.stringify(params) }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      entry: {},
      //   ping: "",
      params: {},
    };
  },
  mounted() {
    // just for display query params
    this.params = this.$route.query;
    // only access for preview mode
    if (!this.entry.status && !this.params.token) {
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
    let { entry } = data;
    // only access for preview mode
    if ((!data.entry || data.entry.status === "disabled") && !token) {
      //   error({ statusCode: 404, message: "Page not found" });
      entry = {};
    }
    return { entry: entry || {} };
  },
};
</script>
