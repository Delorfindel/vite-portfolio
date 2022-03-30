<script >
import TheHeader from "./components/Navigation/TheHeader.vue";
import SecondSection from "./components/Homepage/SecondSection.vue";
import ThirdSection from "./components/Homepage/ThirdSection.vue";
import TheFooter from "./components/Navigation/TheFooter.vue";

export default {
  components: {
    TheHeader,
    SecondSection,
    ThirdSection,
    TheFooter,
  },
}
</script>

<template>
  <TheHeader />
  <div>
    <SecondSection />
    <ThirdSection />
    <TheFooter />
  </div>
</template>

<style>
html,
body {
  width: 100%;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  /* overflow: hidden; */
  overscroll-behavior: none;
  margin: 0;
  position: relative;
}
#viewport {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#scroll-container {
  position: absolute;
  overflow: hidden;
  width: 100%;
}
#scroller {
  height: 100vh;
  overflow: auto;
  overflow-x: hidden;
}

.scroll-content {
  overflow-x: hidden;
}

.scrollbar-track {
  background: white !important;
  /* width: 8px; */
  /* opacity: 1 !important;
  mix-blend-mode: difference; */
}
.scrollbar-thumb {
  background: #0e9ab9 !important;
  border-radius: 0 !important;
}
</style>