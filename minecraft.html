import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020205);
scene.fog = new THREE.Fog(0x020205, 20, 600);

const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// ---------------- LIGHTING ----------------
const ambient = new THREE.AmbientLight(0x00f2ff,0.3);
scene.add(ambient);

const light = new THREE.PointLight(0xff00ff,3,300);
light.position.set(0,50,0);
light.castShadow = true;
scene.add(light);

// ---------------- FLOOR ----------------
const floor = new THREE.Mesh(
new THREE.PlaneGeometry(1000,1000),
new THREE.MeshStandardMaterial({color:0x050505, roughness:0.2})
);
floor.rotation.x = -Math.PI/2;
floor.receiveShadow = true;
scene.add(floor);

// ---------------- CITY ----------------
for(let i=0;i<80;i++){
let h = 10 + Math.random()*80;
let b = new THREE.Mesh(
new THREE.BoxGeometry(10,h,10),
new THREE.MeshStandardMaterial({
color:0x111111,
emissive:0x00f2ff,
emissiveIntensity:0.1
})
);
b.position.set(Math.random()*600-300, h/2, Math.random()*600-300);
b.castShadow=true;
scene.add(b);
}

// ---------------- ENEMIES ----------------
let enemies=[];
let enemySpeed = 0.02;

function spawnEnemy(){
let e = new THREE.Mesh(
new THREE.SphereGeometry(1.5,16,16),
new THREE.MeshStandardMaterial({
color:0xff0044,
emissive:0xff0044,
emissiveIntensity:2
})
);
e.position.set(Math.random()*200-100,2,Math.random()*200-100);
e.castShadow=true;
scene.add(e);
enemies.push(e);
}
for(let i=0;i<6;i++) spawnEnemy();

// ---------------- GUN ----------------
const gun = new THREE.Group();
const body = new THREE.Mesh(
new THREE.BoxGeometry(0.4,0.6,1),
new THREE.MeshStandardMaterial({color:0x111111})
);
const glow = new THREE.Mesh(
new THREE.BoxGeometry(0.1,0.1,1.2),
new THREE.MeshStandardMaterial({
color:0x00f2ff,
emissive:0x00f2ff,
emissiveIntensity:5
})
);
glow.position.z=0.2;
gun.add(body,glow);
scene.add(gun);

// ---------------- CONTROLS ----------------
let keys={}, velocity=new THREE.Vector3();
let canJump=true;
let score=0;
let health=100;
let acceleration = new THREE.Vector3();
const raycaster = new THREE.Raycaster();

onkeydown=e=>keys[e.code]=true;
onkeyup=e=>keys[e.code]=false;

document.body.onclick=()=>document.body.requestPointerLock();

document.addEventListener("mousemove",(e)=>{
if(document.pointerLockElement===document.body){
camera.rotation.y -= e.movementX*0.002;
camera.rotation.x -= e.movementY*0.002;
camera.rotation.x = Math.max(-1.5,Math.min(1.5,camera.rotation.x));
}
});

// ---------------- SHOOT ----------------
onmousedown=()=>{
glow.material.emissiveIntensity=25;
setTimeout(()=>glow.material.emissiveIntensity=5,60);

gun.position.z -= 0.2;

raycaster.setFromCamera(new THREE.Vector2(0,0),camera);
let hits=raycaster.intersectObjects(enemies);
if(hits.length>0){
let hit = hits[0].object;
scene.remove(hit);
enemies.splice(enemies.indexOf(hit),1);
spawnEnemy();
score+=10;
enemySpeed += 0.002;
document.getElementById("score").innerText="SCORE: "+score;
}
};

// ---------------- PHYSICS ----------------
let gravity=0.01;

function animate(){
requestAnimationFrame(animate);

// Movement smoothing
let speed = keys["ShiftLeft"]?0.35:0.2;
let target = new THREE.Vector3();

if(keys["KeyW"]) target.z -= speed;
if(keys["KeyS"]) target.z += speed;
if(keys["KeyA"]) target.x -= speed;
if(keys["KeyD"]) target.x += speed;

acceleration.lerp(target,0.1);
camera.translateX(acceleration.x);
camera.translateZ(acceleration.z);

// Jump
if(keys["Space"] && canJump){
velocity.y=0.25;
canJump=false;
}
velocity.y -= gravity;
camera.position.y += velocity.y;
if(camera.position.y<=2){
camera.position.y=2;
velocity.y=0;
canJump=true;
}

// Enemy AI (chase player)
enemies.forEach(e=>{
let dir = camera.position.clone().sub(e.position).normalize();
e.position.add(dir.multiplyScalar(enemySpeed));
e.position.y = 2 + Math.sin(Date.now()*0.003)*0.4;

// Damage if close
if(e.position.distanceTo(camera.position) < 2){
health -= 0.2;
if(health <= 0){
alert("GAME OVER\nScore: "+score);
location.reload();
}
}
});

// Gun follow
let offset=new THREE.Vector3(0.5,-0.5,-1.5);
offset.applyQuaternion(camera.quaternion);
let targetGun = camera.position.clone().add(offset);
gun.position.lerp(targetGun,0.2);
gun.quaternion.copy(camera.quaternion);

// Neon pulse skyline
light.intensity = 2 + Math.sin(Date.now()*0.002)*1.5;

renderer.render(scene,camera);
}
animate();
