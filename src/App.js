import { useEffect } from "react";
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";

const Orrery = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create Sun
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(geometry, material);
    scene.add(sun);

    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.x = 2; // Earth orbiting around the sun
    scene.add(earth);

    camera.position.z = 5;

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    const animate = () => {
      requestAnimationFrame(animate);

      // Earth orbit animation
      earth.position.x = 2 * Math.cos(Date.now() * 0.001);
      earth.position.z = 2 * Math.sin(Date.now() * 0.001);

      controls.update(); // OrbitControls need updating each frame

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return null;
};

export default Orrery;
