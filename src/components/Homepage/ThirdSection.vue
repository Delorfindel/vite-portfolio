<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default {
  name: 'ThirdSection',
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    //
    const codeExamples = gsap.utils.toArray('.code-example');
    codeExamples.forEach((box, index) => {
      gsap.from(box, {
        lazy: false,
        xPercent: index % 2 === 0 ? 100 : -100,
        opacity: 0,
        ease: 'power1.out',
        scrollTrigger: {
          start: 'top 90%',
          end: 'top 70%',
          trigger: box,
          scrub: 1,
        },
      });
    });
    //
    gsap.to('#code-example-container', {
      scrollTrigger: {
        trigger: '#code-example-container',
        start: 'bottom 70%',
        end: 'bottom 30%',
        scrub: 2,
      },
      lazy: false,
      yPercent: -50,
      opacity: 0,
      ease: 'power1.out',
    });
  }
}
</script>

<template>
  <div
    id="code-example-container"
    class="flex flex-col items-center justify-center w-full py-40 text-black"
  >
    <span class="code-example">React Native</span>
    <span class="code-example">React.js/Next.js</span>
    <span class="code-example">GraphQL/Apollo</span>
    <span class="code-example">TailwindCSS</span>
    <span class="code-example">GSAP</span>
    <span class="code-example">Figma/Sketch</span>
    <span class="code-example">Team Epitech</span>
  </div>
</template>

<style>
#code-example-container span:nth-child(odd) {
  width: 100%;
  background: white;
  color: white;
  -webkit-text-stroke: 2px rgba(0, 0, 0, 0.8);
}

#code-example-container span:nth-child(even) {
  width: 100%;
  background: black;
  color: black;
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
}

.code-example {
  font-size: 9vw;
  line-height: 15vw;
  text-align: center;
}

@media (min-width: 768px) {
  .code-example {
    font-size: 11vw;
    line-height: 19vw;
  }
}
</style>
