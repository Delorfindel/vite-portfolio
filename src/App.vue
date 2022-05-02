<script>
import TheHeader from "./components/Navigation/TheHeader.vue";
import HorizontalSection from "./components/Homepage/HorizontalSection.vue";
import CodeSection from "./components/Homepage/CodeSection.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { RepeatTextScrollFx } from './utils/RepeatTextEffect';
import ThirdSection from "./components/Homepage/ThirdSection.vue";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default {
  components: {
    TheHeader,
    HorizontalSection,
    CodeSection,
    ThirdSection,
    // ThirdSectionBackup
},
  mounted() {
    
    document.querySelectorAll('[data-text-rep]').forEach(textEl => {
        new RepeatTextScrollFx(textEl);
      });
    
    ScrollSmoother.create({
      smooth: 2, // seconds it takes to "catch up" to native scroll position
      effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
    });
    ScrollTrigger.create({
      trigger: "smooth-wrapper",
      pin: ".newnavbar",
      // pinSpacing: false,
    });
  },
};
</script>

<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div
        id="app-wrapper"
        class="flex flex-row items-start justify-between"
      >
        <div class="w-3/4">
          <HorizontalSection />
          <CodeSection />
          <ThirdSection />
        </div>
        <div class="flex flex-col w-1/4 h-screen border-white cursive newnavbar">
          <span class="text-7xl">DANY<br>GANTIER</span>
          <span class="text-base no-cursive">PORTFOLIO © 2022</span>
        </div>
      </div>
      <!-- <TheHeader /> -->
    </div>
  </div>
</template>

<style>
.newnavbar {
  padding: 2vw;
  color: white !important;
  mix-blend-mode: difference;
}

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

.content__title {
	margin: 0;
	display: grid;
	cursor: default;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
  padding-bottom: 0;
}

.text-rep {
  font-size: 20vw;
  line-height: 20vw;
}

.text-rep span {
	grid-area: 1 / 1 / 2 / 2;
	line-height: 20vw;
	/* padding-bottom: calc( 0.059 *20vw); */
	will-change: transform;
  /* writing-mode: vertical-rl;
text-orientation: upright; */
}

.text-rep span:not(:last-child) {
	/* color: var(--color-rep-text); */
}

.demo-3 .text-rep span,
.demo-4 .text-rep span,
.demo-5 .text-rep span {
	padding-bottom: 0;
}

.text-stroke {
  color: black;
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
}

</style>
