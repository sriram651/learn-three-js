import * as THREE from "three";
import { PointerLockControls } from "three-stdlib";
import createPainting from "./utils/painting";
import { loadTexture } from "./utils/texture";
import { createWall } from "./utils/walls";

// Create a new THREE Scene.
const scene = new THREE.Scene();

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const aspectRatio = WIDTH / HEIGHT;

// Create a camera object.
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  aspectRatio, // aspect ratio
  0.1, // near point
  1000, // far point
);

// Add the camera to the scene.
scene.add(camera);

// Position the camera away from the render target in z-axis.
camera.position.z = 5;

// Create a canvas object.
const renderer = new THREE.WebGLRenderer({ antialias: true }); // For smooth edges.

// Customize the renderer.
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor("white");

// Add the renderer to the HTML.
document.body.appendChild(renderer.domElement);

// Lights
// Ambient light
const ambientLight = new THREE.AmbientLight("red", 3);
// ambientLight.position = camera.position;

// Add the ambient light to the scene.
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("green", 4);
directionalLight.position.y = 15;

// Add the directional light to the scene.
scene.add(directionalLight);

// Create a texture for the floor.
const texture = loadTexture("/images/sandal-marble-texture.webp");

// Create a Floor plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = Math.PI / 2; // Degrees in radians
plane.position.y = -Math.PI * 3;

scene.add(plane);

// Create the Walls
// We need to create the walls as a group.
const wallGroup = new THREE.Group();

const blueWallParams = {
  map: loadTexture("/images/blue-marble-texture.webp"),
  side: THREE.DoubleSide
};
// Front Wall
const frontWallGeometry = createWall(blueWallParams);

// Push the front wall away from the camera
frontWallGeometry.position.z = -20;

// Left Wall
const leftWallGeometry = createWall(blueWallParams);

// Rotate the leftWall along the y-axis 90deg and then push it to the left side
leftWallGeometry.position.x = -20;
leftWallGeometry.rotation.y = Math.PI / 2;

// Left Wall
const rightWallGeometry = createWall(blueWallParams);

// Rotate the rightWall along the y-axis 90deg and then push it to the right side
rightWallGeometry.position.x = 20;
rightWallGeometry.rotation.y = Math.PI / 2;


// Add all the 3 walls to the group that we created earlier.
wallGroup.add(frontWallGeometry, leftWallGeometry, rightWallGeometry);

// Finally, add the group to the scene
scene.add(wallGroup);

// Create the Ceiling.
const ceilingWall = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshBasicMaterial(blueWallParams)
);

// Rotate the Ceiling along the x-axis 90deg and push to the the top.
ceilingWall.rotation.x = Math.PI / 2;
ceilingWall.position.y = Math.PI * 3;

// Add the Ceiling to the scene
scene.add(ceilingWall);

// Create the paintings using the utility function.
const painting1 = createPainting("/images/carousel-image4.webp", 10, 5, new THREE.Vector3(-10, 5, -19.99));
const painting2 = createPainting("/images/ronaldo-ucl.jpg", 10, 5, new THREE.Vector3(10, 5, -19.99));

// Finally add the paintings to the scene
scene.add(painting1, painting2);

// TODO: Not yet completed!
// Loop through each of the walls and create a bounding box.
for (let wall = 0; wall < wallGroup.children.length; wall++) {
  wallGroup.children[wall].BBox = new THREE.Box3();
  wallGroup.children[wall].BBox.setFromObject(wallGroup.children[wall]);
}

// Controls
const controls = new PointerLockControls(camera, document.body);

function startTouring() {
  // Lock the pointer
  controls.lock();

  // Hide the menu
  hideMenu();
}

function hideMenu() {
  const menu = document.getElementById("bg-menu");
  menu.style.display = "none";
}

function showMenu() {
  const menu = document.getElementById("bg-menu");
  menu.style.display = "flex";
}

controls.addEventListener("unlock", showMenu);

const startButton = document.getElementById("play-btn");
startButton.addEventListener("click", startTouring);

document.addEventListener("keydown", onKeyDown);

// Move the camera based on the direction of the arrow keys.
function onKeyDown(e) {
  const code = e.keyCode;

  // Left Arrow
  if (code === 37 || code === 65)
    controls.moveRight(-0.12);

  // Right Arrow
  if (code === 39 || code === 68)
    controls.moveRight(0.12);

  // Up Arrow
  if (code === 38 || code === 87)
    controls.moveForward(0.12);

  // Down Arrow
  if (code === 40 || code === 83)
    controls.moveForward(-0.12);
}

// Finally render the scene.
function render() {
  // Render the scene and camera.
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();