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
    class="flex flex-col items-center justify-start w-full mt-40 bg-black"
  >
    <div class="text-4xl text-white">
      <span
        class="content__title content__title--size-l"
        data-text-rep
      >
        0101101001100
      </span>
    </div>
  </div>
</template>

<style>

</style>
