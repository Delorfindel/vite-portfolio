<template>
  <div
    class="absolute top-0 left-0 z-50 flex flex-row items-center justify-between w-full bg-black navbar cursive"
  >
    <!-- <div class="hidden md:block">DANY GANTIER</div> -->
    <span>DANY GANTIER</span>
    <div class="flex-row justify-end hidden md:flex align-center">
      <span class="mr-6">ABOUT</span>
      <span class="mr-6">SKILLS</span>
      <span class="mr-6">HIRE ME</span>
    </div>
  </div>
</template>

<style>
.navbar {
  color: white !important;
  mix-blend-mode: difference;
  z-index: 99 !important;
  padding-left: 5vw;
  padding-right: 5vw;
  height: 5vw;
}

.navbar.cursive {
  font-size: 30px;
  line-height: 30px;
}
</style>