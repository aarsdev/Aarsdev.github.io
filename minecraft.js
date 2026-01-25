// THIS IS THE MOVEMENT KERNEL USED BY PROS
// It uses Vector math instead of simple + and -
const damping = 0.9;
const acceleration = 0.15;

update() {
    // Calculate direction based on camera rotation
    let moveVector = new THREE.Vector3(
        (keys['KeyD'] ? 1 : 0) - (keys['KeyA'] ? 1 : 0),
        0,
        (keys['KeyS'] ? 1 : 0) - (keys['KeyW'] ? 1 : 0)
    ).normalize();

    // Apply acceleration to velocity
    velocity.add(moveVector.multiplyScalar(acceleration));
    
    // Apply friction/damping
    velocity.multiplyScalar(damping);
    
    // Final move
    player.position.add(velocity);
}
