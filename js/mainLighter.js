if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var stats;

var camera, controls, scene, renderer, mesh;

init();
animate();

function init() {

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

    renderer = new THREE.WebGLRenderer({
        antialias: true

    });
    renderer.setClearColor( scene.fog.color );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    var container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 100;

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // world

    //var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
    //var material =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );


    /* Cube */
    var geometry = new THREE.BoxGeometry( 30, 30, 30 );
    var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('models/texture.jpg'),alphaMap:THREE.ImageUtils.loadTexture('models/texture-alpha.jpg'),transparent:true });
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );


    //for ( var i = 0; i < 500; i ++ ) {
    //
    //    mesh = new THREE.Mesh( geometry, material );
    //    mesh.position.x = ( Math.random() - 0.5 ) * 1000;
    //    mesh.position.y = ( Math.random() - 0.5 ) * 1000;
    //    mesh.position.z = ( Math.random() - 0.5 ) * 1000;
    //    mesh.updateMatrix();
    //    mesh.matrixAutoUpdate = false;
    //    scene.add( mesh );
    //
    //}







    // lights

    //light = new THREE.DirectionalLight( 0xffffff );
    //light.position.set( 1, 1, 1 );
    //scene.add( light );
    //
    //light = new THREE.DirectionalLight( 0x002288 );
    //light.position.set( -1, -1, -1 );
    //scene.add( light );
    //
    //light = new THREE.AmbientLight( 0x222222 );
    //scene.add( light );

    //

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild( stats.domElement );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

    stats.update();

    render();

}

function render() {

    renderer.render( scene, camera );


}
