// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene 
const scene = new THREE.Scene();
// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Keep the 3D object on a global variable so we can access it later 
let object;

// OrbitControls allow the camera to move around the scene 
let controls;

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the new model file 
loader.load(
    "kratos_fortnite/scene.gltf",
    function (gltf) {
        object = gltf.scene;
        object.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Adjust position to move the model lower
        object.position.y = -95; // Adjust the value as needed

        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background 
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow maps
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Shadow map type

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Set how far the camera will be from the 3D model
camera.position.z = 200;  // Adjust as needed for your model

// Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 3); // (color, intensity)
topLight.position.set(800, 800, 800); // top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x999999 , 3); // Adjust ambient light color here
scene.add(ambientLight);

// This adds control to the camera, so can rotate / zoom it with the mouse
controls = new OrbitControls(camera, renderer.domElement);

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    // Here we could add some code to update the scene, adding some automatic movement

    renderer.render(scene, camera);
}

// Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add event listeners to buttons for descriptions
document.getElementById("HISTORY").addEventListener("click", function() {
    alert("A Spartan warrior who becomes known as the 'Ghost of Sparta' after being deceived by his former mentor Ares into murdering his family. He later avenges their deaths and becomes the new 'God of War' after killing Ares.");
});

document.getElementById("POWER").addEventListener("click", function() {
    alert("Kratos, being a God of War, obviously gets powers such as quasi-invulnerability and enhanced strength.");
});

document.getElementById("WEAPONS").addEventListener("click", function() {
    const description = "1) The Blades of Chaos: A pair of chained blades fashioned by the God of War, Ares, for Kratos. They are powerful weapons used in combat and traversal.\n\n";
    const additionalDescription = "2) The Leviathan Axe: Imbued with ice elemental power, making it particularly effective against fire-based enemies. The Axe can be thrown at targets and summoned back to the user's hand at will.";
    alert(description + additionalDescription);
});

// Start the 3D rendering
animate();
