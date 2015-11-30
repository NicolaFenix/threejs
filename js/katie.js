//(function() {
//    'use strict';
//    var camera, scene, renderer;
//    var effect, controls;
//    var element, container;
//    var videoTexture, videoMesh;
//
//
//    var clock = new THREE.Clock();
//    init();
//
//    function init() {
//        renderer = new THREE.WebGLRenderer();
//        element = renderer.domElement;
//        container = document.getElementById('canvas');
//        container.appendChild(element);
//        scene = new THREE.Scene();
//    }
//
//    var sphere = new THREE.SphereGeometry(500, 60, 40);
//    sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
//
//    // If video needed
//    //var video = document.getElementById('video');
//    //function bindPlay () {
//    //    video.play();
//    //    document.body.removeEventListener('click', bindPlay);
//    //}
//    //document.body.addEventListener('click', bindPlay, false);
//    //
//
//
//    var videoMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('vr/aula_mac.JPG')});
//    videoMesh = new THREE.Mesh(sphere, videoMaterial);
//
//    effect = new THREE.StereoEffect(renderer);
//    camera = new THREE.PerspectiveCamera(95, 1, 0.001, 700);
//
//    camera.position.set(100, 100, 100);
//    scene.add(camera);
//
//
//
//
//    controls = new THREE.OrbitControls(camera, element);
//    //controls.rotateUp(Math.PI / 4);
//    controls.target.set(
//        camera.position.x + 0.1,
//        camera.position.y,
//        camera.position.z
//    );
//    controls.noZoom = true;
//    controls.noPan = true;
//
//    function setOrientationControls(e) {
//        if (!e.alpha) {
//            return;
//        }
//        controls = new THREE.DeviceOrientationControls(camera, true);
//        controls.connect();
//        controls.update();
//        window.removeEventListener('deviceorientation', setOrientationControls, true);
//    }
//
//    scene.add(videoMesh);
//    window.addEventListener('resize', resize, false);
//    animate();
//
//    function resize () {
//        var width = container.offsetWidth;
//        var height = container.offsetHeight;
//        camera.aspect = width / height;
//        camera.updateProjectionMatrix();
//        renderer.setSize(width, height);
//        effect.setSize(width, height);
//    }
//
//    function update (dt) {
//        resize();
//        controls.update(dt);
//    }
//
//
//    function render () {
//        effect.render(scene, camera);
//    }
//
//    function animate () {
//        requestAnimationFrame(animate);
//        update(clock.getDelta());
//        render();
//    }
//
//    function fullscreen () {
//        if (container.requestFullscreen) {
//            container.requestFullscreen();
//        } else if (container.msRequestFullscreen) {
//            container.msRequestFullscreen();
//        } else if (container.mozRequestFullScreen) {
//            container.mozRequestFullScreen();
//        } else if (container.webkitRequestFullscreen) {
//            container.webkitRequestFullscreen();
//        }
//    }
//
//})();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function () {
    'use strict';

    var camera, scene, renderer;
    var effect, controls;
    var element, container, videoTexture;
    var videoMesh;
    var vector;
    var objects = [];
    var raycaster;
    var mouse;
    var THRESHOLD = 300, valore = 0;
    var currentScene = 'first';


    init();

    function init() {

        renderer = new THREE.WebGLRenderer();
        element = renderer.domElement;
        container = document.getElementById('canvas');
        container.appendChild(element);

        scene = new THREE.Scene();

        var sphere = new THREE.SphereGeometry(500, 64, 64);
        sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

        var plane = new THREE.BoxGeometry(100, 100, 100);


        var planeMateriale = new THREE.MeshLambertMaterial({
            color: 0xFF0000

        });

        var piano = new THREE.Mesh(plane, planeMateriale);

        piano.callback = function () {

            var material = videoMesh.material;
            material.map = THREE.ImageUtils.loadTexture(getMap());
        };

        scene.add(piano);

        var videoMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(getMap())});

        videoMesh = new THREE.Mesh(sphere, videoMaterial);

        effect = new THREE.StereoEffect(renderer);

        camera = new THREE.PerspectiveCamera(95, 1, 0.001, 700);
        camera.position.set(100, 100, 100);
        scene.add(camera);

        scene.add(videoMesh);

        var light2 = new THREE.PointLight(0xff0000, 1, 100);
        light2.position.set(50, 50, 50);
        scene.add(light2);

        var light = new THREE.AmbientLight(0xffffff); // soft white light
        scene.add(light);

        objects.push(piano);

        controls = new THREE.OrbitControls(camera, element);
        controls.rotateUp(Math.PI / 4);
        controls.target.set(
            camera.position.x + 0.1,
            camera.position.y,
            camera.position.z
        );
        controls.noZoom = true;
        controls.noPan = true;

        raycaster = new THREE.Raycaster();

        mouse = new THREE.Vector2();

        window.addEventListener('deviceorientation', setOrientationControls, true);

        window.addEventListener('deviceorientation', onDocumentMouseDown, true);

        window.addEventListener('resize', resize, false);

        document.addEventListener('mousedown', onDocumentMouseDown, false);

        document.addEventListener('touchstart', onDocumentTouchStart, false);

        window.addEventListener('resize', onWindowResize, false);

        animate();
    }

    function getMap() {
        if (currentScene === 'first') {
            currentScene = 'second';
            return 'vr/aula_mac.JPG';
        } else {
            currentScene = 'first';
            return 'vr/definitivo_vuoto.JPG';
        }
    }

    function resize() {
        var width = container.offsetWidth;
        var height = container.offsetHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        effect.setSize(width, height);
    }

    function update() {
        resize();
        controls.update();
    }

    function render() {
        effect.render(scene, camera); //stereo
        //renderer.render(scene, camera); //no stereo
    }

    function animate() {

        requestAnimationFrame(animate);
        update();
        render();

        var mouse = new THREE.Vector2();

        mouse.x = ( ( window.innerWidth / 2) / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = -( (window.innerHeight / 2) / renderer.domElement.clientHeight ) * 2 + 1;

        checkClick(mouse)

    }

    function fullscreen() {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        }
    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        vector = new THREE.Vector3(0, 0, -1);
        vector.applyQuaternion(camera.quaternion);
        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function onDocumentTouchStart(event) {

        event.preventDefault();

        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
        onDocumentMouseDown(event);

    }

    function onDocumentMouseDown(event) {

        event.preventDefault();

        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = -( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

        checkClick(mouse);

    }

    function checkClick(mouse) {

        if (isNaN(mouse.x) || isNaN(mouse.y)) {
            generalLog('Invalid mouse');
            return;
        }

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(objects);

        //generalLog('length ' + intersects.length)

        if (intersects.length > 0) {

            if (intersects[0].object.callback && typeof intersects[0].object.callback === 'function') {

                logCall();

                valore = valore + 1;

                if (valore > THRESHOLD) {

                    intersects[0].object.callback.call();

                    valore = 0;

                    logAzzera();

                    generalLog('Finish counter')
                }

                log(valore)

            }

        } else {

            valore = 0;

            logAzzera()

            log(valore)

            //generalLog('No element found')
        }

    }

    function log(valore) {
        document.getElementById('counter').innerHTML = valore.toString();
    }

    function logCall() {
        document.getElementById('check').innerHTML = Math.random().toString();
    }

    function logAzzera() {
        document.getElementById('azzera').innerHTML = Math.random().toString();
    }

    function generalLog(msg) {

        var elChild = document.createElement('div'),
            el = document.getElementById('log');

        elChild.innerHTML = msg;

        el.insertBefore(elChild, el.firstChild);

    }

    function setOrientationControls(e) {

        if (!e.alpha) {
            return;
        }

        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();

        element.addEventListener('click', fullscreen, false);

        window.removeEventListener('deviceorientation', setOrientationControls, true);

    }

}());
