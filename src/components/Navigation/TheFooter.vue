<script>
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

export default {
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    /// ///////////////////////////////////////// PANELS
    gsap.from("#footer-container", {
      scrollTrigger: {
        trigger: "#footer-container",
        start: "top center",
        end: "+=200",
        scrub: 3,
      },
      lazy: false,
      opacity: 0,
      ease: "power1.out",
    });
  },
};
</script>

<template>
  <div
    id="footer-container"
    class="w-full text-white cursive"
    style="height: 100vh"
  >
    <div
      class="flex flex-col items-center justify-center flex-1 w-full h-full"
      style="height: 100vh"
    >
      <span class="text-center text-white">
        TRAVAILLONS
        <br>ENSEMBLE
      </span>
      <a
        href="https://www.malt.fr/profile/danygantier"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-row items-center justify-center px-10 py-5 mt-[20vh] text-center border border-white rounded-lg group hover:bg-[#FF5B57] hover:border-[#FF5B57] duration-300"
      >
        <span
          class="m-auto text-3xl"
          style="line-height: 0"
        >Consulter mon profil</span>
        <div class="relative ml-3">
          <img
            src="../../assets/Malt_logo_pink.png"
            class="z-10 opacity-0"
            style="height: 50px"
          >
          <img
            src="../../assets/Malt_logo_pink.png"
            class="absolute top-0 z-20 duration-300 opacity-100 group-hover:opacity-0"
            style="height: 50px"
          >
          <img
            src="../../assets/Malt_logo_white.png"
            class="absolute top-0 z-20 duration-300 opacity-0 group-hover:opacity-100"
            style="height: 50px"
          >
        </div>
      </a>
    </div>
    <!-- <div class="flex flex-row items-center justify-between w-full p-5 text-base cursive">
                        <span>gantier.dany@gmail.com</span>
                        <span class="upercase">© copyright 2022 Dany Gantier</span>
                        <span class="">GitHub</span>
    </div>-->
  </div>
</template>
