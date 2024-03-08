import * as THREE from "./three.module.js";

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
const texture = new THREE.TextureLoader().load("./../images/sandal-marble-texture.webp");

// Create a Floor plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = Math.PI / 2; // Degrees in radians
plane.position.y = -Math.PI;

scene.add(plane);

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