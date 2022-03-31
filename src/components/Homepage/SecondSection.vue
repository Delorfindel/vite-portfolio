<script>
import { gsap } from 'gsap';
import { Power2, Power4 } from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';
import AnimatedSphere from "./AnimatedSphere.vue";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'SecondSection',
  components: { AnimatedSphere },
  mounted() {

    //
    let sections = gsap.utils.toArray(".panel");
    let scrollContainer = document.querySelector("#hscroll");
    //

    const tlPanel2 = gsap.timeline().pause();
    tlPanel2.to('.snk .mask-wrapper > span', {
      top: 0,
      stagger: 0.05,
      lazy: false,
      ease: Power2.easeOut,
    });
    tlPanel2.to('.malt .mask-wrapper > span', {
      top: 0,
      stagger: 0.05,
      lazy: false,
      ease: Power2.easeOut,
    });

    const tlPanel1 = gsap.timeline().pause();
    tlPanel1.to('.instant .mask-wrapper-big > span', {
      top: '1vw',
      stagger: 0.05,
      duration: 1,
      delay: .3,
      lazy: false,
      ease: Power2.easeOut,
    });
    tlPanel1.to('.instant .mask-wrapper > span', {
      top: 0,
      stagger: 0.05,
      duration: .5,
      // delay: .5,
      lazy: false,
      ease: Power2.easeOut,
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
        // snap: {
        //   snapTo: 1
        // },
        onUpdate: self => {
          if (self.progress > 0.4) {
            tlPanel1.reverse();
            tlPanel2.play()
          } else {
            tlPanel1.play();
            tlPanel2.reverse()
          }
        },
      }
    });
  }
}
</script>

<template>
  <div class="relative flex flex-row h-screen text-white" id="hscroll">
    <div
      class="absolute top-0 left-0 z-0 flex flex-col items-center justify-center w-screen h-screen overflow-hidden"
    >
      <AnimatedSphere />
    </div>
    <!-- <div
      class="absolute top-0 left-0 z-0 flex flex-col items-center justify-center w-screen h-screen p-20 overflow-hidden"
    >
      <div class="w-full h-full border border-white rounded-xl" />
    </div>-->
    <div class="h-full panel instant">
      <div class="flex flex-col items-center justify-end w-screen h-full text-left">
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
    <div class="panel text-panel lol">
      <div class="flex flex-col items-center justify-between w-full h-full">
        <div class="flex flex-col items-center justify-start w-full h-1/2 typo snk">
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
        <div class="flex flex-col items-end justify-end w-full h-1/2 typo malt">
          <span class="block md:hidden">
            Je vous propose mes services en tant que développeur front-end sur
            la plateforme de Malt
          </span>
          <span class="mask-wrapper right">
            <span class="hidden md:block">Je vous propose mes services</span>
          </span>
          <span class="mask-wrapper right">
            <span class="hidden md:block">en tant que développeur front-end</span>
          </span>
          <span class="mask-wrapper right">
            <span class="hidden md:block">sur la plateforme de freelance Malt.</span>
          </span>
        </div>
      </div>
    </div>
    <!-- <div class="panel text-panel"></div> -->
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
  background: black;
  mix-blend-mode: difference;
}

.panel > div {
  width: 100%;
  height: 100%;
  /* border: solid 1px white;
  border-radius: 50px; */
  /* padding: 5vw; */
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

@media (min-width: 768px) {
  .mask-wrapper-big span {
    font-size: 8vw;
    line-height: 8vw;
  }

  .typo span {
    font-size: 2vw;

    line-height: 2vw;
  }

  .mask-wrapper {
    height: 2vw;
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
