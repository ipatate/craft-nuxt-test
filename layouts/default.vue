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
  console.log(currentPosition, "hello");
  if (currentPosition && currentPosition.scrollY !== undefined) {
    window.scrollTo(currentPosition.scrollX, currentPosition.scrollY);
  }
};
export default {
  mounted() {
    if (this.$preview) {
      // wait all resources loaded for set position scroll
      window.onload = scrollSetPosition;
      console.log(window, window.onload);
      //   window.addEventListener("load", scrollSetPosition);
      document.onreadystatechange = () => {
        console.log(document.readyState);
        if (document.readyState == "complete") {
          scrollSetPosition();
        }
      };
      window.addEventListener("scroll", holdPosition);
    }
  },
  unmounted() {
    if (this.$preview) {
      window.removeEventListener("scroll", holdPosition);
      window.removeEventListener("load", scrollSetPosition);
    }
  },
};
</script>
