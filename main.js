import * as THREE from "three";
import { PointerLockControls } from "three-stdlib";
import createPainting from "./utils/createPainting";

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

// Geometry
const geometry = new THREE.BoxGeometry(2, 2, 2); // Shape of the object
const material = new THREE.MeshBasicMaterial({ color: "#442ad4" }); // Color of the object/material
const cube = new THREE.Mesh(geometry, material);

// Add the mesh to the scene.
scene.add(cube);

// Create a texture for the floor.
const texture = new THREE.TextureLoader().load("/images/sandal-marble-texture.webp");

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

// NOTE: Instead of creating separate variables for each wall's geometry and mesh, we assign them directly.
// Front Wall
const frontWallGeometry = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, 0.01),
  new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide })
);

// Push the front wall away from the camera
frontWallGeometry.position.z = -20;
// frontWallGeometry.position.y = 4;

// Left Wall
const leftWallGeometry = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, 0.01),
  new THREE.MeshBasicMaterial({ color: "green", side: THREE.DoubleSide })
);

// Rotate the leftWall along the y-axis 90deg and then push it to the left side
leftWallGeometry.position.x = -20;
leftWallGeometry.rotation.y = Math.PI / 2;

// Left Wall
const rightWallGeometry = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, 0.01),
  new THREE.MeshBasicMaterial({ color: "blue", side: THREE.DoubleSide })
);

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
  new THREE.MeshBasicMaterial({ color: "yellow", side: THREE.DoubleSide })
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
document.addEventListener("keydown", onKeyDown);

// Move the camera based on the direction of the arrow keys.
function onKeyDown(e) {
  switch (e.keyCode) {

    // Left Arrow
    case 37:
      camera.translateX(0.05)
      break;

    // Right Arrow
    case 39:
      camera.translateX(-0.05)
      break;

    // Up Arrow
    case 38:
      camera.translateY(-0.05)
      break;

    // Down Arrow
    case 40:
      camera.translateY(0.05)
      break;
    default:
      break;
  }
}

// Finally render the scene.
function render() {
  cube.rotation.y += 0.01;
  cube.rotation.x += 0.01;

  // Render the scene and camera.
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();