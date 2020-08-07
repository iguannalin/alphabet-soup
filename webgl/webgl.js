// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
    // Make the loop animated
    animate: true,
    // Get a WebGL canvas rather than 2D
    context: "webgl",
    attributes: {antialias: true}
};

const sketch = ({context}) => {
    // Create a renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: context.canvas
    });

    // WebGL background color
    renderer.setClearColor("hsl(200,0%,10%)", 1);

    // Setup a camera
    const camera = new THREE.OrthographicCamera(45, 1, 0.01, 100);
    // camera.position.set(4, 2, 2);
    // camera.lookAt(new THREE.Vector3());

    // Setup your scene
    const scene = new THREE.Scene();

    // Setup a geometry
    const geometry = new THREE.SphereGeometry(1, 32, 16);

    // Setup a material
    const material = new THREE.MeshBasicMaterial({
        color: "hsl(100,0,90%)",
        wireframe: true
    });

    for (let i = 0; i < 10; i++) {
        console.log(i);
        // Setup a mesh with geometry + material
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random(), Math.random(), Math.random());
        scene.add(mesh);
    }

    // draw each frame
    return {
        // Handle resize events here
        resize({pixelRatio, viewportWidth, viewportHeight}) {
            renderer.setPixelRatio(pixelRatio);
            renderer.setSize(viewportWidth, viewportHeight, false);
            const aspect = viewportWidth / viewportHeight;
            camera.aspect = aspect;

// Ortho zoom
            const zoom = 1.0;

// Bounds
            camera.left = -zoom * aspect;
            camera.right = zoom * aspect;
            camera.top = zoom;
            camera.bottom = -zoom;

// Near/Far
            camera.near = -100;
            camera.far = 100;

// Set position & look at world center
            camera.position.set(zoom, zoom, zoom);
            camera.lookAt(new THREE.Vector3());

// Update the camera
            camera.updateProjectionMatrix();
        },
        // Update & render your scene here
        render({time}) {
            // mesh.rotation.y = time * 1;
            renderer.render(scene, camera);
        },
        // Dispose of events & renderer for cleaner hot-reloading
        unload() {
            renderer.dispose();
        }
    };
};

canvasSketch(sketch, settings);
