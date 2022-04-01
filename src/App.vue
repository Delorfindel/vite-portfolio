<script >
import TheHeader from "./components/Navigation/TheHeader.vue";
import SecondSection from "./components/Homepage/SecondSection.vue";
import ThirdSection from "./components/Homepage/ThirdSection.vue";
import TheFooter from "./components/Navigation/TheFooter.vue";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
 content: "#smooth-content",
  smooth: 2,   // seconds it takes to "catch up" to native scroll position
  effects: true // look for data-speed and data-lag attributes on elements and animate accordingly
});

export default {
  components: {
    TheHeader,
    SecondSection,
    // ThirdSection,
    // TheFooter,
  },
};
</script>

<template>
  <div>
    <TheHeader />
    <main id="smooth-wrapper">
      <div id="smooth-content">
        <SecondSection />
      <!-- <ThirdSection /> -->
      <!-- <TheFooter /> -->
      </div>
    </main>
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