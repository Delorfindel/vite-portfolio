<script>
import { gsap } from 'gsap';
import { Power2, Power4 } from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';
import AnimatedSphere from "./AnimatedSphere.vue";

export default {
  name: 'SecondSection',
  components: { AnimatedSphere },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    //
    let sections = gsap.utils.toArray(".panel");
    let scrollContainer = document.querySelector("#hscroll");
    //
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      lazy: false,
      scrollTrigger: {
        trigger: scrollContainer,
        pin: true,
        scrub: 1,
        end: () => "+=" + scrollContainer.offsetWidth / 2,
        snap: {
          snapTo: 1 / (sections.length - 1),
          delay: 0
        }
      }
    });
    //
    let textSections = gsap.utils.toArray(".text-panel");
    textSections.forEach((sct, i) => {
      const maskedSpans = sct.querySelectorAll(".mask-wrapper > span");
      let start = 'top top-=' + (sct.offsetLeft - window.innerWidth / 2) * ((scrollContainer.offsetWidth / 2) / (sct.offsetWidth * (sections.length)));
      let end = '+=' + (sct.offsetLeft - window.innerWidth / 3) * ((scrollContainer.offsetWidth / 2) / (sct.offsetWidth * (sections.length)));

      gsap.to(maskedSpans, {
        top: 0,
        stagger: 0.02,
        lazy: false,
        ease: Power2.easeOut,
        scrollTrigger: {
          trigger: sct,
          start,
          end,
          scrub: 1,
        }
      });


      gsap.to('.instant .mask-wrapper-big > span', {
        top: '1vw',
        stagger: 0.05,
        duration: .5,
        delay: 0.1,
        lazy: false,
        ease: Power2.easeOut,
      });

      gsap.to('.instant .mask-wrapper > span', {
        top: 0,
        stagger: 0.05,
        duration: .5,
        delay: 0.2,
        lazy: false,
        ease: Power2.easeOut,
      });
    })
  }
}
</script>

<template>
  <div
    class="relative flex flex-row h-screen text-white"
    style="padding-top: 10vw;padding-bottom:5vw;"
    id="hscroll"
  >
    <div
      class="absolute top-0 left-0 z-0 flex flex-col items-center justify-center w-screen h-screen overflow-hidden"
    >
      <AnimatedSphere />
    </div>
    <div class="panel instant">
      <div
        class="flex flex-col items-center justify-end w-screen h-full text-left"
        style="padding-left: 5vw"
      >
        <div class="flex flex-col items-start justify-start w-full">
          <span class="mask-wrapper-big">
            <span class="cursive">BONJOUR</span>
          </span>
        </div>
        <div class="flex flex-col items-end justify-end w-full typo">
          <span class="mask-wrapper">
            <span class="hidden md:block">Je suis un Creative Developer & Entrepreneur.</span>
          </span>
          <span class="mask-wrapper">
            <span class="hidden md:block">95% de mon temps, je développe des</span>
          </span>
          <span class="mask-wrapper">
            <span class="hidden md:block">plateformes & applications numériques</span>
          </span>
          <span class="mask-wrapper">
            <span class="hidden md:block">sur-mesure pour mes clients.</span>
          </span>
        </div>
      </div>
    </div>
    <div class="panel text-panel">
      <div
        class="flex flex-col items-center justify-start w-screen h-full typo"
        style="padding-left: 5vw"
      >
        <span class="block md:hidden">
          J’ai co-fondé l’application Sneakmart, une marketplace communautaire
          autour du monde de la sneaker et du streetwear.
        </span>
        <span class="mask-wrapper">
          <span class="hidden md:block">J’ai co-fondé l’application Sneakmart</span>
        </span>
        <span class="mask-wrapper">
          <span class="hidden md:block">une marketplace communautaire autour du</span>
        </span>
        <span class="mask-wrapper">
          <span class="hidden md:block">monde de la sneaker et du streetwear.</span>
        </span>
      </div>
    </div>
    <div class="panel text-panel">
      <div
        class="flex flex-col items-center justify-end w-screen h-full typo"
        style="padding-left: 5vw"
      >
        <span class="block md:hidden">
          Je vous propose mes services en tant que développeur front-end sur
          la plateforme de Malt
        </span>
        <span class="mask-wrapper">
          <span class="hidden md:block">Je vous propose mes services</span>
        </span>
        <span class="mask-wrapper">
          <span class="hidden md:block">en tant que développeur front-end</span>
        </span>
        <span class="mask-wrapper">
          <span class="hidden md:block">sur la plateforme de freelance Malt.</span>
        </span>
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
}

.typo span {
  font-size: 8vw;
  line-height: 10vw;
}

@media (min-width: 768px) {
  .mask-wrapper-big span {
    font-size: 8vw;
    line-height: 8vw;
  }

  .typo span {
    font-size: 2.5vw;
    line-height: 3vw;
  }

  .mask-wrapper {
    height: 3vw;
    overflow: hidden;
    position: relative;
    z-index: 20;
    width: 100%;
    text-align: left;
    /* border: 1px solid white; */
  }

  .mask-wrapper.right {
    text-align: right;
  }

  .mask-wrapper.center {
    text-align: center;
  }

  .mask-wrapper span,
  .mask-wrapper-big span {
    position: absolute;
    top: 300%;
    width: 100%;
  }

  .mask-wrapper-big {
    height: 9vw;
    /* border: 1px solid white; */
    overflow: hidden;
    position: relative;
    z-index: 20;
    width: 100%;
    text-align: left;
  }
}
</style>
