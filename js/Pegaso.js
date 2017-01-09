$( document ).ready(function() {

    //$('.home-container').toggleClass('visible');

    if (!Detector.webgl) Detector.addGetWebGLMessage();

    var stats;
    var scene;
    var pointLight;
    var camera;
    var renderer;
    var model;
    var animations;
    var kfAnimations = [];
    var kfAnimationsLength = 0;
    var loader = new THREE.ColladaLoader();
    var lastTimestamp = 0;
    var progress = 0;
    var currentTime = 0;
    var cubo;
    var cerchioAlpha;
    var chiesaAlpha;
    initialized = false;

    var modelPath = 'salini/montagna-ruota.dae';


    function init() {

        console.log('BEGIN init()')

        var container = document.createElement('div');
        document.body.appendChild(container);
        container.id = 'wheel';
        //$( "#wheel" ).addClass( "sixteen-nine" );
        // Camera
    //        model.getObjectByName( 'Camera', true ).visible = true;
    //        console.log();


        //camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.01, 100000);
        //camera.position.copy( model.getObjectByName('Camera',true).position );

        // Scene

        scene = new THREE.Scene();


        // KeyFrame Animations

        for (var i = 0; i < kfAnimationsLength; ++i) {

            var animation = animations[i];

            var kfAnimation = new THREE.KeyFrameAnimation(animation);
            kfAnimation.timeScale = 1;
            kfAnimations.push(kfAnimation);

        }


        // Grid

    //        var material = new THREE.LineBasicMaterial( { color: 0x303030 } );
    //        var geometry = new THREE.Geometry();
    //        var floor = -0.04, step = 1, size = 14;
    //
    //        for ( var i = 0; i <= size / step * 2; i ++ ) {
    //
    //            geometry.vertices.push( new THREE.Vector3( - size, floor, i * step - size ) );
    //            geometry.vertices.push( new THREE.Vector3(   size, floor, i * step - size ) );
    //            geometry.vertices.push( new THREE.Vector3( i * step - size, floor, -size ) );
    //            geometry.vertices.push( new THREE.Vector3( i * step - size, floor,  size ) );
    //
    //        }
    //
    //        var line = new THREE.LineSegments( geometry, material );
    //        scene.add( line );

        // Add the COLLADA


    //        model.getObjectByName( 'pasted__pCube1', true ).visible = false;


    //        var sferaGeometria = new THREE.SphereGeometry(100, 30, 30); // Radius, number of width segment, number of height segment Only radius is required
    //        var terraMateriale = new THREE.MeshPhongMaterial(); // Reacts to lights
    //
    //        terraMateriale.map = cerchioAlpha;
    //        terraMateriale.alphaMap = cerchioAlpha;
    //        terraMateriale.transparent = true
    //
    //        var terraMesh = new THREE.Mesh(sferaGeometria, terraMateriale);
    //
    //        scene.add( terraMesh );
        scene.add(model);


        // Lights

    //        pointLight = new THREE.PointLight( 0xffffff, 1);
    //        scene.add( pointLight );

        var light = new THREE.AmbientLight( 0xdedce7 ); // soft white light
        scene.add( light );
   scene.fog = new THREE.FogExp2( 0xdedce7, 0.00017 );

    //        var pianoGeometria = new THREE.PlaneGeometry(2000, 2000, 2000);
    //        var pianoMateriale = new THREE.MeshLambertMaterial({
    //            color: 0xff0000
    //
    //        });
    //
    //
    //
    //        var piano = new THREE.Mesh(pianoGeometria, pianoMateriale);
    //        piano.receiveShadow = true; //Shadow, both casted and received, have to be enabled
    //        piano.rotation.x = -0.5 * Math.PI; //90 degrees in radians
    //        piano.position.set(0, -2, 0);
    //
    //
    //        scene.add(piano);

        // Renderer

        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, logarithmicDepthBuffer: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor( 0xdedce7, 1);
        //renderer.sortObjects = false;
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Stats

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';

        container.appendChild(stats.domElement);

        window.addEventListener('resize', onWindowResize, false);

        console.log('END init()')

    }

    function onWindowResize() {

        //camera.aspect = 1920 / 1080;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function start() {

        console.log('BEGIN start()')

        for (var i = 0; i < kfAnimationsLength; ++i) {

            var animation = kfAnimations[i];

            for (var h = 0, hl = animation.hierarchy.length; h < hl; h++) {

                var keys = animation.data.hierarchy[h].keys;
                var sids = animation.data.hierarchy[h].sids;
                var obj = animation.hierarchy[h];

                //console.log(animation.data);

                if (keys.length && sids) {

                    for (var s = 0; s < sids.length; s++) {

                        var sid = sids[s];
                        var next = animation.getNextKeyWith(sid, h, 0);
                        //var prev = animation.getPrevKeyWith(sid, h, 0);

                        if (next) next.apply(sid);
                        //if (prev) prev.apply(sid);

                    }

                    obj.matrixAutoUpdate = false;
                    animation.data.hierarchy[h].node.updateMatrix();
                    obj.matrixWorldNeedsUpdate = true;

                }

            }

            animation.loop = false;
            animation.play();

        }


        console.log('END start()')


    }

    function update(e) {

        //console.log(e)


        //var frameTime = ( timestamp - lastTimestamp ) * 0.001;
    //
    //        if ( progress >= 0 && progress < kfAnimationsLength ) {
    //
    //            for ( var i = 0; i < kfAnimationsLength; ++i ) {
    //
    //                kfAnimations[ i ].update( frameTime );
    //
    //            }
    //
    //        } else if ( progress >= kfAnimationsLength ) {
    //
    //            for ( var i = 0; i < kfAnimationsLength; ++i ) {
    //
    //                kfAnimations[ i ].stop();
    //
    //            }
    //
    //            progress = 0;
    //            start();
    //
    //        }

        //console.log(scene)

        var VIDEO_INIT = 0,
            VIDEO_END = 101,
            auxTime;

        auxTime = currentTime + e;

        if (auxTime <= VIDEO_END & auxTime >= VIDEO_INIT) {




            currentTime = auxTime;

            var cooD = e;



            model.traverse(function (child) {

                //console.log(child)

                if (child instanceof THREE.PerspectiveCamera) {

                    camera = child;
                    camera.setLens (50, 35 );
                    //camera.near = 0;
    //                camera.fov = 30;
    //                camera.castShadow = true;
                    var vector = new THREE.Vector3();
                    vector.setFromMatrixPosition(model.matrixWorld);

                    //camera.lookAt( vector );
                }


            });


            var position =  parseInt(currentTime*10, 10);


           // updateOverlay(position);

            camera.aspect = window.innerWidth / window.innerHeight;
            //camera.setLens ( 36, 35 )
            camera.near = 10;
            camera.far = 100000;
            camera.updateProjectionMatrix();

            for (var i = 0; i < kfAnimationsLength; ++i) {


                //kfAnimations[ i ].update( animations[0].length - 0.01 );
                kfAnimations[i].update(cooD);


            }
        }


        //console.log( kfAnimations[2]);
        //camera.position.copy( model.getObjectByName('Camera',true).position );
        //camera.position.set(500,500,500);
        //pointLight.position.set(0,200,200);

        //progress += frameTime;
    //        lastTimestamp = timestamp;
        renderer.render(scene, camera);
        stats.update();
        startAnimation()

    }

    var requestId;

    function loop() {
        requestId = window.requestAnimationFrame(tempReq);

    }

    function startAnimation() {
        if (!requestId & !initialized) {
            initialized = true;
            loop();
        }
    }

    function stopAnimation() {

        if (requestId) {
            console.log('STOP loop')
            window.cancelAnimationFrame(requestId);
            requestId = undefined;
        }
    }

    var tempReq = function () {

        update(0);
        loop();
    };

    /* Dani */

    var wheelDistance = function (evt) {
        if (!evt) evt = event;
        var w = evt.wheelDelta, d = evt.detail;
        if (d) {
            if (w) return w / d / 40 * d > 0 ? 1 : -1; // Opera
            else return -d / 3;              // Firefox;         TODO: do not /3 for OS X
        } else return w / 120;             // IE/Safari/Chrome TODO: /3 for Chrome OS X
    };

    var wheelDirection = function (evt) {
        if (!evt) evt = event;
        return (evt.detail < 0) ? 1 : (evt.wheelDelta > 0) ? 1 : -1;
    };

    var counter = 0;

    function handleScroll(evt) {

        if (wheelDirection(evt) > 0) {

            counter = counter + wheelDistance(evt);
        } else {
            counter = counter - Math.abs(wheelDistance(evt));

        }

        update(wheelDirection(evt) * -0.25)

        //animate( counter )

    }

    var Animation = {

        init: function () {

            this.loadModel();

        },

        bindEventListeners: function () {

            $('#test').momentus({
                //u: 10,
                //mass: 1000,
                //wheelRatio: -1000,
                //mouseRatio: 6,
                onChange: function (coords) {



                    stopAnimation();

                    //console.log('scroll ' + Math.random())

                    var progress = (coords.y - lastTimestamp);
                    //console.log(coords.y)
                    //console.log('progress '+ progress);
                    //console.log('lastTimestamp '+ lastTimestamp);








                    //console.log(progress.toFixed(2));
                    //Invert scroll direction
                    update(progress.toFixed(2) * -0.01);

                    lastTimestamp = coords.y;

    //            $('.wheel > div').each(function(i){
    //                //var angle = -(coords.y/2) + (360/10)*i;
    //                //$(this).css('transform', 'perspective(500px) rotate3d(1,0,0,'+angle+'deg) translate3d(0,0,122px)');
    //            });
                }
            });


            //document.addEventListener( 'mousewheel', handleScroll, false );     // Chrome/Safari/Opera
            //document.addEventListener( 'DOMMouseScroll', handleScroll, false ); // Firefox

        },

        loadModel: function () {

            var self = this;

            loader.load(modelPath, function (collada) {



                model = collada.scene;
                animations = collada.animations;
                kfAnimationsLength = animations.length;

                model.scale.x = model.scale.y = model.scale.z = 0.1; // 1/8 scale, modeled in cm

                // Aggiungo Manualmente il canale alpha alle texture

                var manager = new THREE.LoadingManager();

                manager.onProgress = function (item, loaded, total) {

                    console.log(item, loaded, total);

                    console.log((loaded / total * 100) + '% loaded');

                };

                manager.onLoad = function () {
                    // All the texure are loaded
                    console.log('all Loaded');
                };

                var loader = new THREE.ImageLoader(manager);

                console.log(model);

                var children = collada.scene.children || [];

                processArray(children);

                function processArray( array ) {

                    //console.log('processArray' + array)

                    var forbiddenNames = ['Light', 'Plane', 'Camera', 'Nullo', 'group1_pPlane8','mare','triangolo1',
                    'triangolo2','triangolo3','triangolo4','freccia','bastone', 'canazzo',
                    'torre01', 'torre02', 'torre03', 'torre04', 'torre05', 'torre06', 'tri', 'terreno', 'montagna', 'ponte'
                     , 'cestino', 'palo', 'palo_macchina'];

                    var transparent = ['mare'];

                    for (var i = 0; i < array.length; i++) {

                        var name = array[i].name;

                        if ($.inArray(name, forbiddenNames) < 0) {

                            var object = model.getObjectByName(name, true);

                            //console.log(object)

                            if ( name.indexOf('gruppo') > -1 ) {

                                processArray(object.children || []);

                            } else {

                                loadAlpha(name, object);
                            }

                        }

                        if ($.inArray(name, transparent) >= 0) {

                            var object = model.getObjectByName(name, true);

                            console.log(object);

                            applyTransparency(name, object);

                        }
                    }

                }

                function loadAlpha(name, object) {

                    console.log('loadAlpha' + name)

                    var file = 'Pegaso/' + name + '_alpha.jpg',
                        alpha = new THREE.Texture(),
                        material = object.children[0].material;


                    //object.renderOrder = 1
                    material.alphaMap = alpha;
                    material.transparent = true;
                    //material.depthWrite = false;
                    material.side = THREE.DoubleSide;

                    loader.load(file, function (image) {

                        alpha.image = image;
                        alpha.needsUpdate = true;

                    });

                }

                function applyTransparency(name, object) {

                    console.log('applyTransparency' + name)

                    var material = object.children[0].material;

                    material.transparent = true;
                    material.opacity= 0.5;


                }

                self.bindEventListeners();

                init();

                start();

                update(lastTimestamp);

            });

        }

    };

    Animation.init();


    function updateOverlay(e){

        console.log('c:'+ e);

        if(e > 0){

            $('.home-container').addClass('visible');
        }

        if(e > 2){
            //console.log('c:'+ c);
            $('.home-container').removeClass('visible');
        }


        if(e < 40){
            //console.log('c:'+ c);
            $('.message-1').removeClass('visible');
        }


        if(e > 40){
            //console.log('c:'+ c);
            $('.message-1').addClass('visible');
        }

        if(e > 60){
            //console.log('c:'+ c);
            $('.message-1').removeClass('visible');
        }

        if(e < 235){
            //console.log('c:'+ c);
            $('.message-2').removeClass('visible');
        }

        if(e > 235){
            //console.log('c:'+ c);
            $('.message-2').addClass('visible');
        }

        if(e > 255){
            //console.log('c:'+ c);
            $('.message-2').removeClass('visible');
        }

        if(e < 487){
            //console.log('c:'+ c);
            $('.message-3').removeClass('visible');
        }

        if(e > 487){
            //console.log('c:'+ c);
            $('.message-3').addClass('visible');
        }

        if(e > 505){
            //console.log('c:'+ c);
            $('.message-3').removeClass('visible');
        }

        if(e < 626){
            //console.log('c:'+ c);
            $('.message-4').removeClass('visible');
        }

        if(e > 626){
            //console.log('c:'+ c);
            $('.message-4').addClass('visible');
        }





    }




});