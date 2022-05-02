<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import l from 'lodash';

export default {
  name: 'ThirdSection',
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    //
    const amount = 10;
    const codeExamplesOdd = gsap.utils.toArray('.code-example:nth-child(odd) > span:first-child');
    const codeExamplesEven = gsap.utils.toArray('.code-example:nth-child(even) > span:first-child');
    codeExamplesOdd.forEach((box, index) => {
      
      gsap.to(box, {
        lazy: false,
        xPercent: 100,
        ease: 'power1.out',
        scrollTrigger: {
          start: 'top 90%',
          end: 'top -10%',
          trigger: box,
          scrub: 2,
        },
      });
    });
    codeExamplesEven.forEach((box, index) => {
      
      gsap.to(box, {
        lazy: false,
        xPercent: -100,
        ease: 'power1.out',
        scrollTrigger: {
          start: 'top 90%',
          end: 'top -10%',
          trigger: box,
          scrub: 2,
        },
      });
    });
    
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
};
</script>

<template>
  <div
    id="code-example-container"
    class="flex flex-col w-full pb-40 text-black"
  >
    <div class="code-example">
      <span>
        React Native - React Native - React Native - React Native - React Native
      </span>
      <span>
        React Native - React Native - React Native - React Native - React Native
      </span>
    </div>
    <div class="code-example">
      <span>
        React.js - Next.js - React.js - Next.js - React.js - Next.js - React.js - Next.js - React.js - Next.js
      </span>
      <span>
        React.js - Next.js - React.js - Next.js - React.js - Next.js - React.js - Next.js - React.js - Next.js
      </span>
    </div>
    <div class="code-example">
      <span>
        Vue.js - Vite.js - Vue.js - Vite.js - Vue.js - Vite.js - Vue.js - Vite.js - Vue.js - Vite.js
      </span>
      <span>
        Vue.js - Vite.js - Vue.js - Vite.js - Vue.js - Vite.js - Vue.js - Vite.js - Vue.js - Vite.js
      </span>
    </div>
    <div class="code-example">
      <span>
        React Native - React Native - React Native - React Native - React Native
      </span>
      <span>
        React Native - React Native - React Native - React Native - React Native
      </span>
    </div>
    <div class="code-example">
      <span>
        React.js - Next.js - React.js - Next.js - React.js - Next.js - React.js - Next.js - React.js - Next.js
      </span>
      <span>
        React.js - Next.js - React.js - Next.js - React.js - Next.js - React.js - Next.js - React.js - Next.js
      </span>
    </div>
    <div class="code-example">
      <span>
        Vue.js - Vite.js - Vue.js - Vite.js - Vue.js - Vite.js - Vue.js - Vite.js - Vue.js - Vite.js
      </span>
      <span>
        Vue.js - Vite.js - Vue.js - Vite.js - Vue.js - Vite.js - Vue.js - Vite.js - Vue.js - Vite.js
      </span>
    </div>
    <!-- <span class="code-example">GraphQL Rest</span> -->
    <!-- <span class="code-example">GraphQL/Rest</span>
    <span class="code-example">Apollo/Redux</span>
    <span class="code-example">TailwindCSS</span>
    <span class="code-example">GSAP</span>
    <span class="code-example">Figma/Sketch</span>
    <span class="code-example">Team Epitech</span> -->
  </div>
</template>

<style>
#code-example-container  {
 
}

.code-example {
  position: relative;
  width: 100%;
  /* background-color: red; */
}

.code-example > span{
  color: black;
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
  /* position: absolute; */
  top: 0;
  width: 100%;
  /* style */
  font-size: 9vw;
  line-height: 15vw;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  opacity: 0;
}

.code-example > span:first-child {
  position: absolute!important;
  opacity: 1;
}

.code-example:nth-child(even) > span:first-child{
  /* background-color: blue; */
  left: 50%!important;
}

.code-example:nth-child(odd) > span:first-child{
  /* background-color: red; */
  left: -100%!important;
  text-align: right;
  
}

@media (min-width: 768px) {
  .code-example span {
    font-size: 11vw;
    line-height: 19vw;
  }
}
</style>
