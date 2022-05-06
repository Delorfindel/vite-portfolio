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
    <div class="flex flex-col items-end justify-start w-full text-white cursive-light-default"
      style="padding:2vw;font-size:12vw;line-height:12vw;" data-speed="2">
      <span class="">I create,</span>
      <span>innovative</span>
      <span>experiences,</span>
      <span><span class="cursive-italic-default">quality</span> code,</span>
      <span>always with</span>
      <span>performance</span>
      <span>in mind.</span>
      <!-- <span class=""><span class="cursive-italic-default">brands</span> to</span>
      <span class="">people</span> -->
      <!-- <span class="text-6xl ">help you</span> -->
    </div>
  </div>
</template>
<!-- italic text-stroke no-cursive -->
<style>
</style>
