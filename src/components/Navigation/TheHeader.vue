<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'TheHeader',
  mounted() {
    ScrollTrigger.create({
      trigger: "#smooth-content",
      pin: ".navbar",
    });
  }
};
</script>

<template>
  <header
    class="top-0 left-0 flex flex-row items-center justify-between navbar cursive"
  >
    <span>DANY GANTIER</span>
    <div class="flex-row justify-end hidden md:flex align-center">
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
  height: 5vw;
  position: absolute;
  width: 100vw;
}

.pin-spacer .navbar {
  z-index: auto!important;
}

.navbar.cursive {
  font-size: 30px;
  line-height: 30px;
}
</style>