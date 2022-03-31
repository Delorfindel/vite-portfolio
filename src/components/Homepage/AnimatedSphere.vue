<script>
import { gsap } from 'gsap';
import { SteppedEase } from 'gsap/all';
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
  Clock,
  Group,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  PlaneGeometry,
  MeshBasicMaterial,
  LineBasicMaterial,
  ShaderMaterial
} from 'three';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import {
  BloomEffect, EffectComposer, EffectPass, RenderPass,
  DepthOfFieldEffect, VignetteEffect, NoiseEffect, BlendFunction
} from "postprocessing";
import _ from 'lodash';

const settings = {
  speed: 0.01,
  density: 0,
  strength: 0.2,
  frequency: 3.0,
  amplitude: 6.0,
  intensity: 7.0,
};

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

const vertexShader = `  
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
`;
// vec3 phase = vec3(0.0, 0.2, 0.4);
//vec3 phase = vec3(.3, .1, .9);
const fragmentShader = `
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
`;

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
    let firstColor;
    let secondColor;
    //
    let Ico;
    //
    let L1;
    let L2;
    //
    let cursor = {}
    cursor.x = 0
    cursor.y = 0
    let cameraGroup;
    //
    let starsGroup;
    //
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
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
    cameraGroup = new Group()
    scene.add(cameraGroup)
    //
    starsGroup = new Group();
    scene.add(starsGroup);
    //
    camera = new PerspectiveCamera(35, container.offsetWidth / container.offsetHeight, 1, 1000);
    camera.position.z = 6;
    cameraGroup.add(camera);
    //
    // firstColor = new Color('#0E9AB9');
    firstColor = new Color('rgb(255, 255, 255)');
    secondColor = new Color('#CE4760');
    // secondColor = new Color('black');
    // Material
    // const pinkMat = new MeshLambertMaterial({
    //   color: firstColor,
    //   lineWidth: 1,
    //   wireframe: true,
    //   // blending: AdditiveBlending,
    // });
    const pinkMat = material;
    //
    L1 = new PointLight(0xffffff, 0.7);
    L1.position.z = 10;
    L1.position.y = 30;
    L1.position.x = 30;
    scene.add(L1);
    //
    L2 = new PointLight(0xffffff, 0);
    L2.position.z = 20;
    // scene.add(L2);
    //
    // Ico = new Mesh(new IcosahedronGeometry(1, 1), pinkMat);
    Ico = new Mesh(new IcosahedronGeometry(1, 64), pinkMat);
    Ico.rotation.z = 0.5;
    scene.add(Ico);
    const bgColor = {};
    bgColor.color1 = new Color('rgb(0, 0, 0)');
    bgColor.color2 = new Color('rgb(255, 255, 255)');
    // bgColor.color2 = new Color('rgb(180, 180, 180)');
    scene.background = new Color('rgb(0, 0, 0)');
    //
    renderer = new WebGLRenderer({
      // antialias: true,
      // preserveDrawingBuffer: true
    });
    renderer.autoClear = false;
    renderer.autoClearColor = false;
    renderer.setPixelRatio(window.devicePixelRatio, 2);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    // const effectFilm = new FilmPass(0.8, 0.325, 256, false);
    const noiseEffect = new NoiseEffect({
      blendFunction: BlendFunction.NORMAL
    });

    noiseEffect.blendMode.opacity.value = 0.2;
    // const depthOfFieldEffect = new DepthOfFieldEffect(camera, {
    //   focusDistance: .01,
    //   focalLength: .3,
    //   bokehScale: 20.0,
    //   height: 480
    // });
    // const vignetteEffect = new VignetteEffect({
    //   eskil: false,
    //   offset: 0.1,
    //   darkness: 0
    // });

    // composer.addPass(depthOfFieldEffect)
    // composer.addPass(new EffectPass(camera));
    const glitchPass = new EffectPass(camera, noiseEffect);
    composer.addPass(glitchPass);
    // composer.addPass(effectFilm);
    ///////////////////////////////////////////////
    var plane = new Mesh(new PlaneGeometry(1000, 1000), new MeshBasicMaterial({
      color: bgColor.color1,
      opacity: 0.9,
      transparent: true,
    }));
    plane.position.z = -15;
    scene.add(plane);

    var plane2 = new Mesh(new IcosahedronGeometry(70, 64), material2);
    plane2.position.z = -100;
    scene.add(plane2);

    /**
 * Particles
 */
    // Geometry
    const objectsDistance = 50;
    const particlesCount = 1000
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      // positions[i * 3 + 0] = (Math.random() - 0.5) * container.offsetWidth * 0.5;
      // positions[i * 3 + 1] = (Math.random() - 0.5) * container.offsetWidth * 0.5;
      // positions[i * 3 + 2] = (Math.random() - 0.5) * container.offsetWidth * 0.5;
      positions[i * 3 + 0] = _.random(-75, 75) * 0.1;
      positions[i * 3 + 1] = _.random(-75, 75) * 0.1;
      positions[i * 3 + 2] = _.random(-75, 75) * 0.1;
    }

    const particlesGeometry = new BufferGeometry()
    particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3))

    // Material
    const particlesMaterial = new PointsMaterial({
      color: firstColor,
      sizeAttenuation: true,
      size: 0.03
    })

    // Points
    const particles = new Points(particlesGeometry, particlesMaterial)
    // scene.add(particles)
    // cameraGroup.add(particles);


    let scrollContainer = document.querySelector("#hscroll");

    const tlscale = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        end: () => "+=" + scrollContainer.offsetWidth * 0.7,
        // ease: SteppedEase.config(100),
        scrub: 1,
      },
    });

    tlscale.to(Ico.scale, {
      y: 1,
      x: 1,
      z: 1,
    });

    tlscale.to(Ico.scale, {
      y: 1.3,
      x: 1.3,
      z: 1.3,
    });

    const tltranslation = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        end: () => "+=" + scrollContainer.offsetWidth * 0.9,
        scrub: 1,
        // ease: SteppedEase.config(100),
      },
    });

    tltranslation.from(Ico.position, {
      x: 1,
      y: 1,
    });

    tltranslation.to(Ico.position, {
      x: -2.2,
      y: -1,
    });

    const bgTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.s2',
        // start: 1500,
        // end: 9000,
        // start: 50,
        end: () => "+=" + scrollContainer.offsetWidth * 0.4,
        scrub: 1,
        toggleActions: 'restart pause resume pause',
      },
    })

    bgTl.from(plane.material.color, {
      r: bgColor.color1.r,
      g: bgColor.color1.g,
      b: bgColor.color1.b,
    });

    bgTl.to(plane.material.color, {
      r: bgColor.color2.r,
      g: bgColor.color2.g,
      b: bgColor.color2.b,
    })

    const bgTl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.s2',
        // start: 1500,
        // end: 9000,
        // start: 50,
        end: () => "+=" + scrollContainer.offsetWidth * 0.4,
        scrub: 1,
        toggleActions: 'restart pause resume pause',
      },
    })

    bgTl2.from(plane.material, { opacity: .8 });

    bgTl2.to(plane.material, { opacity: .7 });

    const renderTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        // start: 1500,
        // end: 9000,
        // start: 'top top +=' + 10,
        end: () => "+=" + scrollContainer.offsetWidth * 0.7,
        scrub: 1,
        // toggleActions: 'restart pause resume pause',
      },
    })

    renderTl.from(Ico.material.uniforms.uNoiseDensity, {
      value: 0.15,
    });

    renderTl.to(Ico.material.uniforms.uNoiseDensity, {
      value: 2,
    });

    const tlLight = gsap.timeline({
      // repeat: -1,
      // repeatDelay: 3
    });

    tlLight.from(L1.position, {
      x: 30,
      y: 30,
      ease: SteppedEase.config(100),
      duration: 0.1,
    })
      .to(L1.position, {
        x: 30,
        y: -30,
        duration: 0.1,
      })
      .to(L1.position, {
        x: -30,
        y: -30,
        duration: 0.1,
      })
      .to(L1.position, {
        x: -30,
        y: 30,
        duration: 0.1,
      })
      .to(L1.position, {
        x: 10,
        y: 10,
        duration: 0.1,
      })

    gsap.to(particlesMaterial.color, {
      scrollTrigger: {
        trigger: '.s2',
        // start: 1500,
        // end: 9000,
        end: () => "+=" + (scrollContainer.offsetWidth / 2),
        scrub: 2,
        toggleActions: 'restart pause resume pause',
      },
      r: secondColor.r,
      g: secondColor.g,
      b: secondColor.b,
    });

    gsap.to(Ico.material.color, {
      scrollTrigger: {
        trigger: '.s2',
        end: () => "+=" + (scrollContainer.offsetWidth / 2),
        scrub: 2,
        toggleActions: 'restart pause resume pause',
      },
      r: secondColor.r,
      g: secondColor.g,
      b: secondColor.b,
    });



    window.addEventListener('mousemove', (event) => {
      // cursor.x = event.clientX / sizes.width - 0.5;
      // cursor.y = event.clientY;
      cursor.x = event.clientX / sizes.width - 0.5
      cursor.y = event.clientY / sizes.height - 0.5
    })
    //

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    //   
    const clock = new Clock()
    let previousTime = 0

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      const deltaTime = elapsedTime - previousTime
      previousTime = elapsedTime

      // Mesh Rotation
      Ico.rotation.x += 0.08 * deltaTime;
      Ico.rotation.y += 0.08 * deltaTime;
      particles.rotation.x += .05 * deltaTime;
      particles.rotation.y += .05 * deltaTime;
      // Camera Cursor
      const parallaxX = cursor.x * 0.5;
      const parallaxY = - cursor.y * 0.5;
      time += 1 * deltaTime;

      cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
      cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

      // Render
      // renderer.render(scene, camera)
      composer.render();


      // Update uniforms
      Ico.material.uniforms.uTime.value = time;
      plane2.material.uniforms.uTime.value = time;
      // this.mesh.material.uniforms.uSpeed.value = settings.speed;
      // Ico.material.uniforms.uNoiseDensity.value = settings.density;
      // this.mesh.material.uniforms.uNoiseStrength.value = settings.strength;
      // this.mesh.material.uniforms.uFrequency.value = settings.frequency;
      // this.mesh.material.uniforms.uAmplitude.value = settings.amplitude;
      // this.mesh.material.uniforms.uIntensity.value = settings.intensity;
      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick();
  },
};
</script>

<template>
  <div id="ico" class="w-full h-full" />
</template>
