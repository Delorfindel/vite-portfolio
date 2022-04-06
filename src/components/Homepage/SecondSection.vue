<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";
import AnimatedSphere from "./AnimatedSphere.vue";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default {
  name: 'SecondSection',
  components: { AnimatedSphere },
  mounted() {
    //
    let sections = gsap.utils.toArray(".panel");
    let scrollContainer = document.querySelector("#hscroll");
    //

    // SplitText
    const detailsText = new SplitText('.typo span', { type: "lines", charsClass: "line", position: "relative" });
    const textEffect = {
      duration: 1.5,
      y: 50,
      rotateZ: 2,
      opacity: 0,
      ease: 'expo',
      stagger: 0.1,
    };

    // First Panel

    const tlPanel1 = gsap.timeline().pause();
    tlPanel1.from(".typo.bonjour .big", { ...textEffect, delay: .5, duration: 1 });
    tlPanel1.from(".typo.bonjour span:not(.big)", textEffect);

    gsap.from('.typo.second span', {
      ...textEffect,
      scrollTrigger: {
        trigger: scrollContainer,
        scrub: 2,
        start: scrollContainer.offsetWidth / 2 - 200,
        end: () => "+=" + 200,
      }
    });

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      lazy: false,
      scrollTrigger: {
        trigger: scrollContainer,
        pin: true,
        scrub: true,
        end: () => "+=" + scrollContainer.offsetWidth / 2,
        snap: true,
        onUpdate: self => {
          if (self.progress > 0.4) {
            tlPanel1.reverse();
            // tlPanel2.play();
          } else {
            tlPanel1.play();
            // tlPanel2.reverse();
          }
        },
      }
    });
    //////////////
  }
};
</script>

<template>
  <div
    id="hscroll"
    class="relative flex flex-row h-screen text-white"
  >
    <div
      class="absolute top-0 left-0 z-0 flex flex-col items-center justify-center w-screen h-screen overflow-hidden"
    >
      <AnimatedSphere />
    </div>
    <div class="h-full panel instant">
      <div class="flex flex-col items-start justify-end w-screen h-full text-left typo bonjour">
        <span class="big cursive">BONJOUR</span>
        <span class="hidden md:block">Je suis un Creative Developer & Entrepreneur.</span>
        <span class="hidden md:block">95% de mon temps, je développe des</span>
        <span class="hidden md:block">plateformes & applications numériques</span>
        <span class="hidden md:block">sur-mesure pour mes clients.</span>
      </div>
    </div>
    <div class="panel text-panel">
      <div class="flex flex-col items-center justify-between w-full h-full typo second">
        <div class="flex flex-col items-start justify-start w-full h-1/2">
          <span class="block md:hidden">
            J’ai co-fondé l’application Sneakmart, une marketplace communautaire
            autour du monde de la sneaker et du streetwear.
          </span>
          <span class="hidden md:block">J’ai co-fondé l’application Sneakmart</span>
          <span class="hidden md:block">une marketplace communautaire autour du</span>
          <span class="hidden md:block">monde de la sneaker et du streetwear.</span>
        </div>
        <div class="flex flex-col items-end justify-end w-full h-1/2">
          <span class="block md:hidden">
            Je vous propose mes services en tant que développeur front-end sur
            la plateforme de Malt
          </span>
          <span class="hidden md:block">Je vous propose mes services</span>
          <span class="hidden md:block">en tant que développeur front-end</span>
          <span class="hidden md:block">sur la plateforme de freelance Malt.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#hscroll {
  width: calc(400vw);
  height: 100vh;
  display: flex;
  flex-direction: row;
}
.panel {
  height: 100%;
  width: 100vw;
  z-index: 10;
  padding: 5vw;
  /* background: black;
  mix-blend-mode: difference; */
}

.panel > div {
  width: 100%;
  height: 100%;
}

.panel.nope > div {
  padding-bottom: 0;
}

.typo span {
  font-size: 8vw;
  line-height: 10vw;
  font-weight: 300 !important;
}

.snk-img {
  width: 15%;
}

.test-line span > div {
  overflow: hidden;
}

.bonjour {
  color: rgba(200, 200, 200);
}

.second {
  color: rgba(50, 50, 50);
}

@media (min-width: 768px) {
  .typo span {
    font-size: 2.5vw;
    line-height: 2.6vw;
  }
  .typo .big {
    font-size: 8vw;
    line-height: 8vw;
  }
}
@media (min-width: 1280px) {
  .typo span {
    font-size: 2vw;
    line-height: 2vw;
  }
  .typo .big {
    font-size: 6vw;
    line-height: 6vw;
  }
}
</style>
