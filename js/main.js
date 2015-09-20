///* Define the renderer and the scene */

var scene, cube, renderer, camera, controls;

var mesh, zmesh, geometry;

var meshes = [];



init();
animate();

function init() {
    var width = window.innerWidth;
    var height = window.innerHeight;


    scene = new THREE.Scene();

///* Values (Field of view - 45 looks natural, Camera ratio, how closer, how far tha object can be ) */
    camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 10000 );

    renderer = new THREE.WebGLRenderer({
         antialias: true
        ,preserveDrawingBuffer:true
    });
    renderer.setSize( width, height );
    renderer._microCache = new MicroCache();
    document.body.appendChild( renderer.domElement );




    /* Cube */
    var geometry = new THREE.BoxGeometry( 3, 3, 3 );
    var texture = renderer._microCache.getSet('heavy', THREE.ImageUtils.loadTexture('models/texture-light.jpg'));
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); //Lambert material allows shading on the sides
    cube = new THREE.Mesh( geometry, material );
    THREE.GeometryUtils.merge(geometry, cube);
    scene.add( cube );




    /* Sky */
    var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var skyboxMaterial = new THREE.MeshLambertMaterial({ color: 0x000000, side: THREE.BackSide });
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

    scene.add(skybox);

    /* Light*/
    var light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 2, 2, 2 );
    scene.add( light );


    //var light = new THREE.PointLight( 0xff0000, 1, 100 );
    //light.position.set( 2, 2, 2 );
    //scene.add( light );



    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 2;
    camera.lookAt(cube.position);



    /* Controls */


    controls = new THREE.OrbitControls( camera );
    controls.addEventListener( 'change', render );
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;

    controls.rotateSpeed = 2.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    //controls = new THREE.TrackballControls( cube );
    //
    //controls.rotateSpeed = 2.0;
    //controls.zoomSpeed = 1.2;
    //controls.panSpeed = 0.8;
    //
    //
    //
    //controls.noZoom = false;
    //controls.noPan = false;
    //
    //controls.staticMoving = false;
    //controls.dynamicDampingFactor = 0.3;
    //
    //controls.keys = [ 65, 83, 68 ];
    //
    //controls.addEventListener( 'change', render );

    window.addEventListener( 'resize', onWindowResize, false );

    render(); //RENDER
}


/* Object */



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    controls.handleResize();

    render();

}


function animate() {

    requestAnimationFrame( animate );
    controls.update();

}



function render() {
    requestAnimationFrame( render );


    //controls.update();
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.1;


    renderer.render(scene, camera);
};

