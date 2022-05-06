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
  <div id="code-section" class="flex flex-col items-center justify-start w-full mt-40">
    <div class="text-4xl text-white">
      <span class="content__title content__title--size-l" data-text-rep>
        0101101001100
      </span>
    </div>
    <div class="flex flex-col items-end justify-start w-full font-bold text-white text-8xl cursive-default"
      style="padding:2vw;" data-speed="2">
      <span class="font-bold text-9xl no-cursive">I create,</span>
      <span class="font-bold text-9xl no-cursive"></span>
      <span class="mt-10 text-6xl">And I will tell you</span>
      <span class="text-6xl"><span class="">how</span> I can help you</span>
      <!-- <span class="text-6xl ">help you</span> -->
    </div>
  </div>
</template>
<!-- italic text-stroke no-cursive -->
<style>
</style>
