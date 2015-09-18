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

    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );




    /* Cube */
    var geometry = new THREE.BoxGeometry( 3, 3, 3 );
    var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('models/texture.jpg') }); //Lambert material allows shading on the sides
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    /* Object */
    //var loader = new THREE.JSONLoader(),
    //    callbackKey = function(geometry) {createScene(geometry,  0, 0, 0, 1, "models/texture.jpg")};
    //loader.load("models/pannello.js", callbackKey);


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
    //camera.lookAt(cube.position);



    /* Controls */

    controls = new THREE.TrackballControls( camera );

    controls.rotateSpeed = 2.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;



    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];

    controls.addEventListener( 'change', render );

    window.addEventListener( 'resize', onWindowResize, false );

    render(); //RENDER
}


function createScene(geometry, x, y, z, scale, tmap) {
    zmesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(tmap)}));
    zmesh.position.set(x, y, z);
    zmesh.scale.set(scale, scale, scale);
    meshes.push(zmesh);
    scene.add(zmesh);
}



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

