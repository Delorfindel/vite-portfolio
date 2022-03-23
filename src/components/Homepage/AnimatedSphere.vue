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
} from 'three';
import _ from 'lodash';

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
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    ///////////////////////////////////////////////
    container = document.getElementById('ico');
    //
    scene = new Scene();
    //
    cameraGroup = new Group()
    scene.add(cameraGroup)
    //
    camera = new PerspectiveCamera(35, container.offsetWidth / container.offsetHeight, 1, 1000);
    camera.position.z = 6;
    cameraGroup.add(camera);
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
    Ico = new Mesh(new IcosahedronGeometry(1.5, 1), pinkMat);
    Ico.rotation.z = 0.5;
    scene.add(Ico);
    //
    renderer = new WebGLRenderer();
    renderer.autoClear = false;
    renderer.setPixelRatio(window.devicePixelRatio, 2);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    ///////////////////////////////////////////////
    /**
 * Particles
 */
    // Geometry
    const objectsDistance = 50;
    const particlesCount = 500
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      // positions[i * 3 + 0] = (Math.random() - 0.5) * container.offsetWidth * 0.5;
      // positions[i * 3 + 1] = (Math.random() - 0.5) * container.offsetWidth * 0.5;
      // positions[i * 3 + 2] = (Math.random() - 0.5) * container.offsetWidth * 0.5;
      positions[i * 3 + 0] = _.random(-60, 60) * 0.1;
      positions[i * 3 + 1] = _.random(-60, 60) * 0.1;
      positions[i * 3 + 2] = _.random(-200, 30) * 0.1;
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
    scene.add(particles)


    let scrollContainer = document.querySelector("#hscroll");

    const tlscale = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        end: () => "+=" + (scrollContainer.offsetWidth / 2),
        ease: SteppedEase.config(100),
        scrub: 1,
      },
    });

    const tltranslation = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        end: () => "+=" + (scrollContainer.offsetWidth / 2),
        scrub: 1,
        ease: SteppedEase.config(100),
      },
    });

    tlscale.from(Ico.scale, {
      y: 1,
      x: 1,
      z: 1,
    });
    tlscale.to(Ico.scale, {
      y: 1,
      x: 1,
      z: 1,
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

    tltranslation.from(Ico.position, {
      x: 0,
      y: 0,
    });
    tltranslation.to(Ico.position, {
      x: 0,
      y: -1.5,
    });
    tltranslation.to(Ico.position, {
      x: .5,
      y: 0.2,
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
      Ico.rotation.x += 0.1 * deltaTime;
      Ico.rotation.y += 0.1 * deltaTime;
      // Camera Cursor
      const parallaxX = cursor.x * 0.5;
      const parallaxY = - cursor.y * 0.5;

      cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
      cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

      // Render
      renderer.render(scene, camera)

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
