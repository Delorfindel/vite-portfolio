<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";
import AnimatedSphere from "./AnimatedSphere.vue";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default {
  name: 'HorizontalSection',
  components: { AnimatedSphere },
  mounted() {
    //
    let sections = gsap.utils.toArray(".panel");
    let scrollContainer = document.querySelector("#hscroll");
    //

    // SplitText
    const textEffect = {
      duration: 1,
      y: 50,
      rotateZ: 2,
      opacity: 0,
      ease: 'expo',
      stagger: 0.1,
    };

    const titleEffect = {
      duration: 1.5,
      y: 50,
      rotateZ: 2,
      opacity: 0,
      ease: 'expo',
      delay: 3,
    };

    const subEffect = {
      duration: 3.5,
      xPercent: 20,
      opacity: 0,
      ease: 'expo',
    };

    const tlPanel1 = gsap.timeline().pause();
    const tlPanel2 = gsap.timeline();
    tlPanel1.from(".typo.bonjour .big", { ...textEffect, delay: 1.5, duration: 1 });
    tlPanel1.from(".typo.bonjour span:not(.big)", textEffect);
    tlPanel2.from(".title", titleEffect);
    tlPanel2.from(".subtitle", subEffect);

    gsap.from('.typo.second span', {
      ...textEffect,
      scrollTrigger: {
        trigger: scrollContainer,
        scrub: 1,
        start: scrollContainer.offsetWidth / 3 - 200,
        end: () => "+=" + 200,
      }
    });

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      lazy: false,
      scrollTrigger: {
        trigger: scrollContainer,
        // pin: true,
        scrub: 3,
        start: 0,
        end: () => "+=" + scrollContainer.offsetWidth / 2,
        // snap: true,
        onUpdate: self => {
          if (self.progress > 0.4 && self.progress < 0.6) {
            tlPanel1.reverse();
            // secondSectionTl.reverse();
          } else if (self.progress < 0.4) {
            tlPanel1.play();
          } else if (self.progress > 0.6) {
            // secondSectionTl.play();
          }
        },
      }
    });

    ScrollTrigger.create({
      trigger: scrollContainer,
      start: 0,
      end: () => "+=" + scrollContainer.offsetWidth / 2 * 3,
      scrub: 1,
      pin: true,
      // pinSpacing: false,
    });

    // ScrollTrigger.create({
    //   trigger:'#horizontal-section',
    //   // start: 0,
    //   // end: () => "+=" + scrollContainer.offsetWidth / 2 * 3,
    //   scrub: 1,
    //   pin: '#bio-section',
    //   pinSpacing: false,
    // });
  }
};
</script>

<template>
  <div id="scroll-container">
    <div id="hscroll" class="relative flex flex-row h-screen text-white second-section">
      <div id="animation-container"
        class="absolute top-0 left-0 z-10 flex flex-col items-center justify-center w-full h-screen">
        <AnimatedSphere />
      </div>
      <!-- <div class="absolute top-0 z-20 w-screen h-screen bg-black ">
        <div class="w-full h-full bg-black rounded-3xl bg-blend-difference" />
      </div> -->
      <div class="h-full panel instant">
        <div class="flex flex-col items-start justify-end h-full text-left typo bonjour">
          <div class="flex flex-col items-start justify-end">
            <span class="big cursive">Entrepreneur<br />& Creative Developer</span>
            <div class="mt-5 ml-auto mr-0">
              <span class="hidden pl-20 md:block">I create code / front-end development /</span>
              <span class="hidden pl-20 md:block">web app, mobile app, progressive app.</span>
              <span class="hidden pl-20 md:block">Also design / nice-looking stuff /</span>
              <span class="hidden pl-20 md:block">user experience, user interface.</span>
              <span class="hidden pl-20 mt-10 md:inline-flex tagline">
                <div>#orange</div>
                <div>#viaccess-orca</div>
                <div>#sneakmart</div>
                <div>#artur.ai</div>
                <div>#egonlab</div>
                <!-- <div>#valorem</div> -->
              </span>
              <!-- <span class="hidden pl-20 md:block">#credeo</span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="panel text-panel">
        <div class="flex flex-col items-center justify-between w-full h-full typo second">
          <div class="flex flex-col items-start justify-start w-full h-1/2">
            <span class="block md:hidden">
              J’ai co-fondé l’application Sneakmart, une marketplace communautaire
              autour du monde de la sneaker et du streetwear.
            </span>
            <span class="hidden md:block">J’ai co-fondé l’application <span
                class="italic cursive">Sneakmart</span></span>
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
            <span class="hidden md:block">sur la <span class="italic cursive">plateforme de freelance
                Malt.</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.tagline>div {
  padding: .5vw 1.2vw;
  border: 1px solid white;
  border-radius: 2vw;
  font-size: 1.3vw !important;
  line-height: 1.3vw !important;
  /* font-weight: !important; */
  background-color: white !important;
  color: black !important;
  margin-right: .5vw;
  cursor: pointer;
}

body {
  --horizontal-container-width: 75vw;
  --horizontal-container-padding: 2vw;
}

#scroll-container {
  /* margin-bottom: 200vh; */
  width: var(--horizontal-container-width);
}

.second-section {
  clip-path: inset(2vw 2vw 2vw 2vw round 20px);
}

#hscroll {
  /* width: calc(400vw); */
  height: 100vh;
  display: flex;
  flex-direction: row;
}

.panel {
  height: 100%;
  width: calc(var(--horizontal-container-width) - (var(--horizontal-container-padding) * 2));
  z-index: 10;
  padding: calc(var(--horizontal-container-padding) * 2);
  /* padding-top: 15vw; */
  /* background: black; */
  /* background-color: rgba(0, 0, 0, 0); */
  mix-blend-mode: difference;
}

.panel>div {
  width: calc(var(--horizontal-container-width) - (var(--horizontal-container-padding) * 4));
  height: 100%;
}

.panel.nope>div {
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

.test-line span>div {
  overflow: hidden;
}

.bonjour {
  /* color: rgba(200, 200, 200); */
  color: white;
}

.second {
  /* color: rgba(50, 50, 50); */
  color: white;
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
    font-size: 2.4vw;
    line-height: 2.4vw;
  }

  .typo .big {
    font-size: 6vw;
    line-height: 6vw;
  }
}
</style>
