<script>
import { gsap } from 'gsap';
import { Linear, Power4 } from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Color,
  AdditiveBlending,
  PointLight,
  Mesh,
  IcosahedronGeometry,
  MeshLambertMaterial,
} from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

export default {
  name: 'AnimatedSphere',
  props: {},
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    let container;
    //
    let renderer;
    let camera;
    let scene;
    //
    let composer1;
    let composer2;
    let fxaaPass;
    //
    let firstColor;
    let secondColor;
    //
    let Ico;

    //
    init();
    animate();

    /// ////////////////////////////////////////////

    // Camera

    function init() {
      container = document.getElementById('ico');
      camera = new PerspectiveCamera(80, container.offsetWidth / container.offsetHeight, 1, 2000);
      camera.position.x = -70;
      camera.position.y = -10;
      camera.position.z = 200;
      //
      scene = new Scene();
      scene.add(camera);
      //
      firstColor = new Color('#0E9AB9');
      secondColor = new Color('#CE4760');
      // Material
      const pinkMat = new MeshLambertMaterial({
        color: firstColor,
        wireframe: true,
        blending: AdditiveBlending,
      });
      //
      const L1 = new PointLight(0xffffff, 1);
      L1.position.z = 100;
      L1.position.y = 100;
      L1.position.x = 100;
      scene.add(L1);
      //
      const L2 = new PointLight(0xffffff, 0.8);
      L2.position.z = 200;
      L2.position.y = 50;
      L2.position.x = -100;
      scene.add(L2);
      //
      Ico = new Mesh(new IcosahedronGeometry(85, 1), pinkMat);
      Ico.rotation.z = 0.5;
      scene.add(Ico);
      //
      renderer = new WebGLRenderer();
      renderer.autoClear = false;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.domElement);
      //
      const renderPass = new RenderPass(scene, camera);
      //
      fxaaPass = new ShaderPass(FXAAShader);
      const copyPass = new ShaderPass(CopyShader);

      composer1 = new EffectComposer(renderer);
      composer1.addPass(renderPass);
      composer1.addPass(copyPass);

      //

      const pixelRatio = renderer.getPixelRatio();

      fxaaPass.material.uniforms.resolution.value.x = 1 / (container.offsetWidth * pixelRatio);
      fxaaPass.material.uniforms.resolution.value.y = 1 / (container.offsetHeight * pixelRatio);

      composer2 = new EffectComposer(renderer);
      composer2.addPass(renderPass);
      composer2.addPass(fxaaPass);

      //
      window.addEventListener('resize', resizeRendererToDisplaySize);
    }
    // Render
    function resizeRendererToDisplaySize() {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(container.offsetWidth, container.offsetHeight);
      composer1.setSize(container.offsetWidth, container.offsetHeight);
      composer2.setSize(container.offsetWidth, container.offsetHeight);

      const pixelRatio = renderer.getPixelRatio();

      fxaaPass.material.uniforms.resolution.value.x = 1 / (container.offsetWidth * pixelRatio);
      fxaaPass.material.uniforms.resolution.value.y = 1 / (container.offsetHeight * pixelRatio);
    }

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    let sections = gsap.utils.toArray(".panel");
    let scrollContainer = document.querySelector("#hscroll");
    gsap.to(Ico.rotation, {
      scrollTrigger: {
        trigger: scrollContainer,
        end: () => "+=" + (scrollContainer.offsetWidth + innerWidth * 2),
        scrub: 1,
      },
      y: Ico.rotation.x + 3,
      x: Ico.rotation.y + 3,
    });

    const tlscale = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        end: () => "+=" + (scrollContainer.offsetWidth + innerWidth * 2),
        ease: Power4.easeOut,
        scrub: 1,
      },
    });

    tlscale.to(Ico.scale, {
      y: 1.3,
      x: 1.3,
      z: 1.3,
    });
    tlscale.to(Ico.scale, {
      y: 1.5,
      x: 1.5,
      z: 1.5,
    });
    tlscale.to(Ico.scale, {
      y: 2,
      x: 2,
      z: 2,
    });

    const tltranslation = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        start: innerWidth / 2,
        end: () => "+=" + (scrollContainer.offsetWidth - innerWidth),
        scrub: 1,
        ease: Power4.easeOut,
      },
    });

    tltranslation.to(camera.position, {
      x: 0,
      y: 100,
      // z: 1,
    });
    tltranslation.to(camera.position, {
      x: 0,
      y: 100,
    });
    tltranslation.to(camera.position, {
      x: -70,
      y: -10,
    });

    gsap.to(Ico.material.color, {
      scrollTrigger: {
        trigger: '.s2',
        start: 1500,
        end: 9000,
        scrub: 2,
        toggleActions: 'restart pause resume pause',
      },
      r: secondColor.r,
      g: secondColor.g,
      b: secondColor.b,
    });
  },
};
</script>

<template>
  <div id="ico" class="w-full h-full" />
</template>
