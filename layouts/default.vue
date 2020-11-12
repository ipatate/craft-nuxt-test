<template>
  <Nuxt />
</template>

<script>
import { debounce } from "throttle-debounce";

// create key for each page
const getKey = () => {
  return "%%live-preview-pos" + "|" + window.location.pathname;
};

// memoise scroll position
const holdPosition = debounce(300, () => {
  window.sessionStorage.setItem(
    getKey(),
    JSON.stringify({ scrollX: window.scrollX, scrollY: window.scrollY })
  );
});
/**
 * set scroll position
 */
const scrollSetPosition = () => {
  const currentPosition = JSON.parse(window.sessionStorage.getItem(getKey()));
  if (currentPosition && currentPosition.scrollY !== undefined) {
    window.scrollTo(currentPosition.scrollX, currentPosition.scrollY);
  }
};
export default {
  mounted() {
    const { query } = this.$route;

    if (
      query.preview ||
      query["x-craft-live-preview"] ||
      query["x-craft-preview"]
    ) {
      // wait all resources loaded for set position scroll
      //   window.onload = scrollSetPosition;
      // don't work on prod :(
      window.addEventListener("load", scrollSetPosition);
      window.addEventListener("scroll", holdPosition);
    }
  },
  unmounted() {
    const { query } = this.$route;
    if (
      query.preview ||
      query["x-craft-live-preview"] ||
      query["x-craft-preview"]
    ) {
      window.removeEventListener("scroll", holdPosition);
      window.removeEventListener("load", scrollSetPosition);
    }
  },
};
</script>
