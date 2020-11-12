<template>
  <div>
    <div v-for="entry in entries" :key="entry.id">
      <h1>{{ entry.title }}</h1>
      <p>{{ entry.intro }}</p>
      <div v-html="entry.body" />
      <nuxt-link :to="entry.uri">Read more</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      entries: [],
    };
  },
  async asyncData({ $axios, route }) {
    let headers = {};
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
            query BlogPosts {
                entries( type: "blog") {
                    id
                    title
                    body
                    uri
            }
        }
        `,
      },
      { headers }
    );
    return { entries: data.entries };
  },
};
</script>
