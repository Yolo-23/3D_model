import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let object; 
let controls;

const loader = new GLTFLoader();

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

        object.position.y = -95;

        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

document.getElementById("container3D").appendChild(renderer.domElement);


camera.position.z = 200; 

const topLight = new THREE.DirectionalLight(0xffffff, 3);
topLight.position.set(800, 800, 800);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x999999 , 3);
scene.add(ambientLight);

controls = new OrbitControls(camera, renderer.domElement);


function animate() {
    requestAnimationFrame(animate);
    

    renderer.render(scene, camera);
}


window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

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

animate();
