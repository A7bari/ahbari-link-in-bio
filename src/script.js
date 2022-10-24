import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// initialisation 
const canvas = document.querySelector('#canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1F1E23); 
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / (window.innerHeight * .8), 0.1, 100 );
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize( window.innerWidth, window.innerHeight*.8 );

// sphere 
const geometry = new THREE.SphereBufferGeometry( 4, 15, 8 );
const material = new THREE.MeshStandardMaterial( { color: 0xAAAA9B, wireframe: true } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );


// twitter 
const twitter = new THREE.Group() ;
const geometry1 = new THREE.SphereBufferGeometry( 0.1, 10, 10 );
const material1 = new THREE.MeshStandardMaterial( { color: 0x37A9E1 } );
const sphere1 = new THREE.Mesh( geometry1, material1 );

twitter.add(sphere1, new THREE.PointLight(0x37A9E1)) ;

scene.add( twitter );

// linkedIn 
const linkedIn = new THREE.Group() ;
linkedIn.add(new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 0.1, 10, 10 ),
    new THREE.MeshStandardMaterial( { color: '#FFE817' } )
  ), new THREE.PointLight('#FFE817')) ;

scene.add( linkedIn );

// github 
const github = new THREE.Group() ;
github.add(new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 0.1, 10, 10 ),
    new THREE.MeshStandardMaterial( { color: '#7F3FF1' } )
  ), new THREE.PointLight('#7F3FF1')) ;

scene.add( github );

// insta 
const insta = new THREE.Group() ;
insta.add(new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 0.1, 10, 10 ),
    new THREE.MeshStandardMaterial( { color: '#FF0161' } )
  ), new THREE.PointLight('#FF0161')) ;

scene.add( insta );

// light
const pointLight = new THREE.PointLight(0xAAAA9B);
pointLight.position.set(0, 5, 9);

const ambientLight = new THREE.AmbientLight(0xffffff, .4);
scene.add(pointLight, ambientLight);



// controles 
const controls = new OrbitControls(camera, renderer.domElement);
//disable zoom
controls.enableZoom = false;
controls.rotateSpeed = .2 ;

window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

  camera.aspect = window.innerWidth / (window.innerHeight * .8) ;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight * .8 );

}


// animation
let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame( animate );

  let elapsedTime = clock.getElapsedTime() ;
  let angle = elapsedTime * .3 ;

  twitter.position.x = 5 * (Math.cos(angle) - Math.sin( angle)) ;
  twitter.position.y = 4 * Math.sin( angle);
  twitter.position.z = Math.cos(angle);


  linkedIn.position.x = 5 * (Math.cos(angle) ) ;
  linkedIn.position.z = 5 *( Math.sin( angle));
  linkedIn.position.y = 2 * ( Math.sin( -0.2*angle));

  github.position.y = 4.8 * (Math.cos(angle) ) ;
  github.position.z = 4.8 *( Math.sin( angle));

  insta.position.x = - 5 * Math.cos( angle);
  insta.position.y = - 4.5 * Math.sin( angle);
  insta.position.z = - Math.sin( 0.1*angle);

  sphere.rotation.x += 0.002;
  sphere.rotation.y += 0.002;
  controls.update()
  renderer.render( scene, camera );
};

animate();