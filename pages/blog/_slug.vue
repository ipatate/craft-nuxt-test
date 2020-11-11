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
                entry(slug: "${slug}") {
                    title
                    body
                }
            }
        `,
      },
      { headers }
    );

    return { entry: data.entry };
  },
};
</script>
