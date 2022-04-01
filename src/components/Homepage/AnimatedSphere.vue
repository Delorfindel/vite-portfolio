

<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Color,
  Mesh,
  IcosahedronGeometry,
  Clock,
  Group,
  PlaneGeometry,
  MeshBasicMaterial,
  ShaderMaterial,
} from 'three';
import {
  EffectComposer, EffectPass, RenderPass,
  NoiseEffect, BlendFunction, PixelationEffect
} from "postprocessing";
import sphereShaders from '../../Shaders/sphereShader.jsx';

const { fragmentShader, vertexShader } = sphereShaders;

const settings = {
  speed: 0.01,
  density: 0,
  strength: 0.2,
  frequency: 3.0,
  amplitude: 6.0,
  intensity: 7.0,
};

export default {
  name: 'AnimatedSphere',
  props: {},
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    ///////////////////////////////////////////////
    let container;
    //
    let renderer;
    let camera;
    let scene;
    //
    let Ico;
    //
    let cursor = {};
    cursor.x = 0;
    cursor.y = 0;
    let cameraGroup;
    //
    let starsGroup;
    //
    let pixel = {
      value: 100,
    };
    //
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    ///////////////////////////////////////////////
    let time = 0;
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: time },
        uSpeed: { value: settings.speed },
        uNoiseDensity: { value: 1 },
        uNoiseStrength: { value: settings.strength },
        uFrequency: { value: settings.frequency },
        uAmplitude: { value: settings.amplitude },
        uIntensity: { value: settings.intensity },
      },
      // wireframe: true,
    });
    const material2 = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: time },
        uSpeed: { value: .01 },
        uNoiseDensity: { value: 2 },
        uNoiseStrength: { value: settings.strength },
        uFrequency: { value: settings.frequency },
        uAmplitude: { value: settings.amplitude },
        uIntensity: { value: settings.intensity },
      },
      // wireframe: true,
    });
    container = document.getElementById('ico');
    //
    scene = new Scene();
    //
    cameraGroup = new Group();
    scene.add(cameraGroup);
    //
    starsGroup = new Group();
    scene.add(starsGroup);
    //
    camera = new PerspectiveCamera(35, container.offsetWidth / container.offsetHeight, 1, 1000);
    camera.position.z = 6;
    cameraGroup.add(camera);
    //
    Ico = new Mesh(new IcosahedronGeometry(1, 64), material);
    Ico.rotation.x = .8;
    Ico.rotation.y = .8;
    scene.add(Ico);
    const bgColor = {};
    bgColor.color1 = new Color('rgb(0, 0, 0)');
    bgColor.color2 = new Color('rgb(255, 255, 255)');
    scene.background = new Color('rgb(0, 0, 0)');
    //
    renderer = new WebGLRenderer({
      antialias: true,
      // preserveDrawingBuffer: true
    });
    renderer.autoClear = false;
    renderer.autoClearColor = false;
    renderer.setPixelRatio(window.devicePixelRatio, 2);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    const composer = new EffectComposer(renderer);
    const pixelationEffect = new PixelationEffect(pixel.value);
    const renderPass = new RenderPass(scene, camera);
    const effectPass = new EffectPass(camera, pixelationEffect);
    composer.addPass(renderPass);
    const noiseEffect = new NoiseEffect({
      blendFunction: BlendFunction.NORMAL
    });

    noiseEffect.blendMode.opacity.value = 0.2;
    const glitchPass = new EffectPass(camera, noiseEffect);
    composer.addPass(glitchPass);
    composer.addPass(effectPass);
    ///////////////////////////////////////////////
    const plane = new Mesh(new PlaneGeometry(1000, 1000), new MeshBasicMaterial({
      color: bgColor.color1,
      opacity: 0.7,
      transparent: true,
    }));
    plane.position.z = -15;
    scene.add(plane);

    const plane2 = new Mesh(new IcosahedronGeometry(70, 64), material2);
    plane2.position.z = -100;
    scene.add(plane2);

    const scrollContainer = document.querySelector("#hscroll");


    // console.log(pixelationEffect)
    // gsap.to(pixel, {
    //   value: 1,
    //   duration: 2
    // });

    const transparentPlaneColorTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.s2',
        // start: 1500,
        // end: 9000,
        // start: 50,
        end: () => "+=" + scrollContainer.offsetWidth * 0.4,
        scrub: 1,
        toggleActions: 'restart pause resume pause',
      },
    });

    transparentPlaneColorTimeline.from(plane.material.color, {
      r: bgColor.color1.r,
      g: bgColor.color1.g,
      b: bgColor.color1.b,
    });

    transparentPlaneColorTimeline.to(plane.material.color, {
      r: bgColor.color2.r,
      g: bgColor.color2.g,
      b: bgColor.color2.b,
    });

    const transparentPlaneOpacityTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        end: () => "+=" + scrollContainer.offsetWidth * 0.4,
        scrub: 1,
      },
    });

    transparentPlaneOpacityTimeline.from(plane.material, { opacity: .7 });

    transparentPlaneOpacityTimeline.to(plane.material, { opacity: .6 });

    const sphereScaleTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        end: () => "+=" + scrollContainer.offsetWidth * 0.7,
        scrub: 1,
      },
    });

    sphereScaleTimeline.to(Ico.scale, {
      y: 1,
      x: 1,
      z: 1,
    });

    sphereScaleTimeline.to(Ico.scale, {
      y: 1.3,
      x: 1.3,
      z: 1.3,
    });

    const sphereTranslationTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        end: () => "+=" + scrollContainer.offsetWidth * 0.9,
        scrub: 1,
      },
    });

    sphereTranslationTimeline.from(Ico.position, {
      x: 1,
      y: 1,
    });

    sphereTranslationTimeline.to(Ico.position, {
      x: -2.2,
      y: -1,
    });

    const sphereNoiseTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        end: () => "+=" + scrollContainer.offsetWidth * 0.7,
        scrub: 1,
      },
    });
    sphereNoiseTimeline.from(Ico.material.uniforms.uNoiseDensity, {
      value: 0.15,
    });
    sphereNoiseTimeline.to(Ico.material.uniforms.uNoiseDensity, {
      value: 2,
    });

    window.addEventListener('mousemove', (event) => {
      // cursor.x = event.clientX / sizes.width - 0.5;
      // cursor.y = event.clientY;
      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = event.clientY / sizes.height - 0.5;
    });
    //

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    //   
    const clock = new Clock();
    let previousTime = 0;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;
      // Mesh Rotation
      Ico.rotation.x += 0.04 * deltaTime;
      Ico.rotation.y += 0.04 * deltaTime;
      // Camera Cursor
      const parallaxX = cursor.x * 0.5;
      const parallaxY = - cursor.y * 0.5;
      cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
      cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;
      // Render
      composer.render();
      // Update uniforms
      Ico.material.uniforms.uTime.value = time;
      plane2.material.uniforms.uTime.value = time;
      //
      if (pixelationEffect.getGranularity() > 1) {
        // console.log(10 * elapsedTime);
        // pixelationEffect.setGranularity(pixelationEffect.getGranularity() - 1 * deltaTime);
        pixelationEffect.setGranularity(100 - 40 * elapsedTime)
      }

      time += 1 * deltaTime;
      window.requestAnimationFrame(tick);
    };

    tick();
  },
};
</script>

<template>
  <div id="ico" class="w-full h-full" />
</template>
