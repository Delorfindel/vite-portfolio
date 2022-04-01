
<script>
const noise = `
// GLSL textureless classic 3D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-10-11
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise, periodic variant
float pnoise(vec3 P, vec3 rep)
{
  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}
`;

const rotation = `
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}

vec3 rotateY(vec3 v, float angle) {
  return rotation3dY(angle) * v;
}  
`;

const sphereShaders = {
  vertexShader: `  
varying vec2 vUv;
varying float vDistort;

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;
uniform float uAmplitude;

${noise}

${rotation}

void main() {
  vUv = uv;
  
  float t = uTime * uSpeed;
  float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;

  vec3 pos = position + (normal * distortion);
  float angle = sin(uv.y * uFrequency + t) * uAmplitude;
  pos = rotateY(pos, angle);    
  
  vDistort = distortion;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}  
`,
  fragmentShader: `
varying vec2 vUv;
varying float vDistort;

uniform float uTime;
uniform float uIntensity;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}     

void main() {
  float distort = vDistort * uIntensity;
  
  vec3 brightness = vec3(0.5, 0.5, 0.5);
  vec3 contrast = vec3(0.5, 0.5, 0.5);
  vec3 oscilation = vec3(1.0, 1.0, 1.0);
  vec3 phase = vec3(.0, .1, .2);
  

  vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);
  
  gl_FragColor = vec4(color, 1.0);
}  
`,
};
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
// const sphereShaders = require('./sphereShader.jsx');
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
  // data() {
  //   return {
  //     settings: {
  //       speed: 0.01,
  //       density: 0,
  //       strength: 0.2,
  //       frequency: 3.0,
  //       amplitude: 6.0,
  //       intensity: 7.0,
  //     },
  //     container,
  //     renderer,
  //     camera,
  //     scene,
  //     Ico,
  //     cursor: {
  //       x: 0,
  //       y: 0
  //     },
  //     cameraGroup,
  //     pixel: { value: 100 },
  //     sizes: {
  //       width: window.innerWidth,
  //       height: window.innerHeight
  //     },
  //     time: 0,
  //     material,
  //     material2,
  //     bgColor: {
  //       color1: new Color('rgb(0, 0, 0)'),
  //       color2: new Color('rgb(255, 255, 255)')
  //     },
  //     composer,
  //     pixelationEffect,
  //     renderPass,
  //     effectPass,
  //     noiseEffect,
  //     plane,
  //     plane2,
  //     scrollContainer: document.querySelector("#hscroll")
  //   };
  // },
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
      antialias: false,
      powerPreference: "high-performance"
    });
    renderer.autoClear = false;
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
      if (pixelationEffect.granularity > 1) {
        pixelationEffect.granularity = 100 - 40 * elapsedTime;
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
