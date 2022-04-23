<script>
import TheHeader from "./components/Navigation/TheHeader.vue";
import SecondSection from "./components/Homepage/SecondSection.vue";
import ThirdSection from "./components/Homepage/ThirdSection.vue";
import TheFooter from "./components/Navigation/TheFooter.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default {
  components: {
    TheHeader,
    SecondSection,
  },
  mounted() {
    ScrollSmoother.create({
      smooth: 2, // seconds it takes to "catch up" to native scroll position
      effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
    });
  },
};
</script>

<template>
  <div>
    <!-- <div class="absolute w-full h-full"> -->
    <div>
      <SecondSection />
      <TheHeader />
      <div
        class="flex flex-col items-center justify-center w-full h-screen bg-black"
      >
        <div class="text-4xl text-white">
          LOL
        </div>
        <div
          
          class="mt-40 text-4xl text-white"
        >
          LOL
        </div>
      </div>
      <!-- <ThirdSection /> -->
      <!-- <TheFooter /> -->
    </div>
  </div>
</template>

<style>

html,
body {
  width: 100%;
  min-height: 100vh;
  min-height: -webkit-fill-available;
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
