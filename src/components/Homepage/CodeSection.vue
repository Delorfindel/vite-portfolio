<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default {
  name: 'CodeSection',
  mounted() {
    
  }
};
</script>

<template>
  <div
    id="code-section"
    class="flex flex-col items-center justify-start w-full mt-40"
  >
    <div class="text-4xl text-white">
      <span
        class="content__title content__title--size-l"
        data-text-rep
      >
        0101101001100
      </span>
    </div>
    <div
      class="flex flex-col items-end justify-start w-full font-bold text-white text-8xl cursive-default" 
      style="padding:2vw;"
      data-speed="2"
    >
      <span class="font-bold text-9xl no-cursive">TELL ME</span>
      <span>YOUR <span class="text-stroke no-cursive">STORY</span></span>
      <span>AND I'll TELL YOU</span>
      <span><span class="font-bold text-9xl no-cursive">HOW </span>I CAN</span>
      <span class="text-stroke no-cursive">HELP YOU</span>
    </div>
  </div>
</template>

<style>

</style>
