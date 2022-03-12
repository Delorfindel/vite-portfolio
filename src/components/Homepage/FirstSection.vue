/* eslint-disable vue/html-self-closing */
<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default {
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    const disableIntro = true;
    if (!disableIntro) {
      const tl = gsap.timeline();

      const fullScreen = window.innerHeight;
      const middleScreen = window.innerHeight / 2;
      const fullText = (window.innerHeight / 100) * 11;
      const halfText = ((window.innerHeight / 100) * 11) / 2;
      const idealMiddle = middleScreen - halfText;
      const currentTopPosition = fullScreen - fullText - 110;
      const fixedMiddle = -idealMiddle + currentTopPosition;

      tl.from(
        '#name',
        {
          y: -fixedMiddle,
          duration: 1.5,
          ease: 'power1.out',
        },
        2,
      )
        .from('#intro', {
          opacity: 0,
          duration: 1.5,
          ease: 'power1.out',
        })
        .from(
          '.navbar',
          {
            opacity: 0,
            duration: 1.5,
            ease: 'power1.out',
          },
          '<',
        )
        .from(
          '#photo',
          {
            opacity: 0,
            duration: 1.5,
            ease: 'power1.out',
          },
          '<',
        );
    }

    /// ///////////////////////////////////////// Animations photo

    gsap.to('#section-blue-bg', {
      scrollTrigger: {
        trigger: '#photo',
        start: 'top 75%',
        end: 'top 60%',
        scrub: 1,
      },
      backgroundColor: 'black',
      scaleY: 2.5,
      yPercent: -50,
      ease: 'power1.out',
    });

    gsap.to('#selfie', {
      scrollTrigger: {
        trigger: '#photo',
        start: 'top 75%',
        end: 'top 60%',
        scrub: 1,
      },
      scale: 2,
      ease: 'power1.out',
    });

    gsap.to('#selfie', {
      scrollTrigger: {
        trigger: '#photo',
        start: 'bottom 60%',
        end: 'bottom 40%',
        scrub: 1,
      },
      yPercent: -120,
      opacity: 0,
      ease: 'power1.out',
    });
  }
}
/// ///////////////////////////////////////// Splash

</script>

<template>
  <div
    class="flex-col items-center justify-between hidden h-screen bg-white md:flex"
    style="margin-bottom: -100px; padding-bottom: 110px;"
  >
    <span />
    <span
      id="intro"
      class="text-xl text-center md:text-4xl"
    >
      CO-FONDATEUR DE
      <span class="magic-hover magic-hover__square">SNEAKMART</span>
      <br>FREELANCE
      <span class="magic-hover magic-hover__square">SUPER MALTER 3</span>
      <br>DEVELOPPEUR FRONT-END
      <br>UX/UI DESIGNER
    </span>
    <div class="justify-self-end">
      <h2
        id="name"
        class="cursive"
      >
        DANY GANTIER
      </h2>
    </div>
  </div>
  <div
    id="photo"
    class="hidden bg-black md:block md:relative"
    style="height: 100vh"
  >
    <div
      id="section-blue-bg"
      style="height: 60vh;background-color: #0E9AB9;"
    />
    <div
      class="absolute top-0 w-full"
      style="height: 60vh"
    >
      <img
        id="selfie"
        src="../../assets/pp.webp"
        class="mx-auto"
        style="width: 30vw; margin-top: 20vh"
      >
    </div>
  </div>
</template>