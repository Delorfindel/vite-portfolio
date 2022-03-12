<script>
import { gsap } from 'gsap';
import { Linear } from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default {
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    let sections = gsap.utils.toArray(".stage");
    let scrollContainer = document.querySelector("#hscroll");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: scrollContainer,
        pin: true,
        scrub: 1,
        end: () => "+=" + scrollContainer.offsetWidth,
      }
    });

    sections.forEach((sct, i) => {
      gsap.from(sct, {
        opacity: 0,
        scrollTrigger: {
          trigger: sct,
          start: 'top top-=' + (sct.offsetLeft - window.innerWidth / 2) * (scrollContainer.offsetWidth / (sct.offsetWidth * (sections.length - 1))),
          end: '+=' + sct.offsetWidth * (scrollContainer.offsetWidth / (sct.offsetWidth * (sections.length - 1))),
          toggleActions: "play pause resume reset",
        }
      })
    })

  },
}

</script>

<template>
  <main id="content">
    <div id="hscroll">
      <section id="stage-1" class="stage purple">
        <h2>This is stage 1</h2>
      </section>

      <section id="stage-2" class="stage blue">
        <h2>This is stage 2</h2>
      </section>

      <section id="stage-3" class="stage green">
        <h2>This is stage 3</h2>
      </section>

      <section id="stage-4" class="stage yellow">
        <h2>This is stage 4</h2>
      </section>

      <section id="stage-5" class="stage red">
        <div>
          <h2>Contact Us</h2>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
      </section>
    </div>
    <div class="proxy"></div>
  </main>q
</template>

<style>
#hscroll {
  width: calc(500vw);
  height: 100vh;
  display: flex;
  flex-direction: row;
}
.stage {
  width: calc(100vw);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 0;
  padding: 20px;
}

/*== For DEMO Styling Only==*/
section {
  text-align: center;
  color: #fff;
  font-size: 2em;
}
#stage-1 {
  background: #dd3e54;
  background: linear-gradient(to right, #6be585, #dd3e54);
}
#stage-2 {
  background: #090979;
  background: linear-gradient(to right, #090979, #00d4ff);
}
#stage-3 {
  background: #833ab4;
  background: linear-gradient(to right, #833ab4, #fd1d1d, #fcb045);
}
#stage-4 {
  background: #009fff;
  background: linear-gradient(to right, #009fff, #ec2f4b);
}
#stage-5 {
  background: #8a2387;
  background: linear-gradient(to right, #8a2387, #e94057, #f27121);
}
</style>