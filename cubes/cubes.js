global.THREE = require('three');

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');
const eases = require('eases');
const BezierEasing = require('bezier-easing');

const settings = {
    animate: true,
    dimensions: [512, 512],
    fps: 24,
    duration: 4,
    // Get a WebGL canvas rather than 2D
    context: 'webgl',
    // Turn on MSAA
    attributes: {antialias: true}
};

const sketch = ({context, width, height}) => {
    // Create a renderer
    const renderer = new THREE.WebGLRenderer({
        context
    });

    const palette = random.pick(palettes);

    // WebGL background color
    renderer.setClearColor('hsl(0, 0%, 95%)', 1);

    // Setup a camera, we will update its settings on resize
    const camera = new THREE.OrthographicCamera();

    // Setup your scene
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // Create the mesh
    for (let i = 0; i < 10; i++) {
        // Re-use the same Geometry across all our cubes
        // Basic "unlit" material with no depth
        const material = new THREE.MeshBasicMaterial({color: random.pick(palette)});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(random.range(-1, 1), random.range(-1, 1), random.range(-1, 1));
        mesh.scale.set(random.range(-1, 1), random.range(-1, 1), random.range(-1, 1));
        // Smaller cube
        mesh.scale.multiplyScalar(0.5);
        // Then add the group to the scene
        scene.add(mesh);
    }
    scene.add(new THREE.AmbientLight('hsl(0,0%,40%'));

    const light = new THREE.DirectionalLight('white', 1);
    light.position.set(0, 0, 4);
    scene.add(light);

    const easeFn = BezierEasing(1,.42,0,-0.67);


    // draw each frame
    return {
        // Handle resize events here
        resize({pixelRatio, viewportWidth, viewportHeight}) {
            renderer.setPixelRatio(pixelRatio);
            renderer.setSize(viewportWidth, viewportHeight);
            const aspect = viewportWidth / viewportHeight;
            // Ortho zoom
            const zoom = 1.5;
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

            // Update camera properties
            camera.updateProjectionMatrix();
        },
        // And render events here
        render({playhead}) {
            const t = Math.sin(playhead * Math.PI);
            scene.rotation.z = easeFn(t);
                // Draw scene with our camera
            renderer.render(scene, camera);
        },
        // Dispose of WebGL context (optional)
        unload() {
            renderer.dispose();
        }
    };
};

canvasSketch(sketch, settings);
