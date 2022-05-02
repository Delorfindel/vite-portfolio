<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'TheHeader',
  mounted() {
    ScrollTrigger.create({
      trigger: "body",
      pin: ".navbar",
      pinSpacing: false,
    });
  }
};
</script>

<template>
  <header
    class="top-0 left-0 flex flex-row items-center justify-between navbar cursive"
  >
    <div class="flex-row justify-start hidden h-full md:flex align-center">
      <span>DANY GANTIER</span>
    </div>
    <div class="flex-row justify-end hidden h-full md:flex align-center">
      <span class="mr-6">ABOUT</span>
      <span class="mr-6">SKILLS</span>
      <span class="mr-6">HIRE ME</span>
    </div>
  </header>
</template>

<style>
.navbar {
  color: white !important;
  mix-blend-mode: difference;
  padding-left: 5vw;
  padding-right: 5vw;
  height: 5vh;
  margin-top: 1.25vh;
  position: absolute;
  width: 100vw;
}

.pin-spacer .navbar {
  z-index: auto!important;
}

.navbar.cursive {
  font-size: 30px;
  line-height: 55px;
}
</style>