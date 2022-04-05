import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";
import { FirstPersonControls } from "./FirstPersonControls";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(1, 0.6, 1);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

const loaderr = new THREE.TextureLoader();
loaderr.load(
  "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg",
  function (texture) {
    scene.background = texture;
  }
);

let geometry, mesh, plane;
plane = new THREE.MeshBasicMaterial({ color: 0xffffff });
geometry = new THREE.PlaneGeometry(4, 4, 4);
mesh = new THREE.Mesh(geometry, plane);
mesh.position.set(0, 0, 0);
mesh.rotation.x = -Math.PI / 2;
scene.add(mesh);

// Light

// Light in general
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// Simulating the sun
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 0, 0);
directionalLight.position.set(0, 0, 0);

// Load Model
const loadModel = () => {
  const loader = new GLTFLoader();
  loader.load(
    "./assets/alfa_romeo_stradale_1967/scene.gltf",
    (gltf) => {
      gltf.scene.traverse((child) => {
        child.castShadow = true;
      });
      scene.add(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log(error);
    }
  );
};
loadModel();

// Orbital controls
let controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  render();

  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
