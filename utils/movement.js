import { Box3, Group, PerspectiveCamera, Vector3 } from "three";

const keysPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
};

export function moveUser(e) {
    if (e.key in keysPressed) {
        keysPressed[e.key] = true;
    }
}

export function stopUser(e) {
    if (e.key in keysPressed) {
        keysPressed[e.key] = false;
    }
}

export function updateMovement(delta, controls, camera, wallGroup) {
    // Determine the movement speed relative to the frame rate of the currently viewing window.
    // We use the delta to maintain same speeds in all screens.
    const speed = 5 * delta;

    // To check if the user/camera is colliding with the cubicle/room/BoundingBox, 
    // We take store the clone of the current position before changing.
    const previousPosition = camera.position.clone();

    // Left Arrow
    if (keysPressed.ArrowLeft || keysPressed.a)
        controls.moveRight(-speed);

    // Right Arrow
    if (keysPressed.ArrowRight || keysPressed.d)
        controls.moveRight(speed);

    // Up Arrow
    if (keysPressed.ArrowUp || keysPressed.w)
        controls.moveForward(speed);

    // Down Arrow
    if (keysPressed.ArrowDown || keysPressed.s)
        controls.moveForward(-speed);

    // Check if the camera is colliding with any of the walls in the wall group,
    // and if so, set the camera/user position to the same cloned one (Hence does not change/move).
    if (checkCollision(camera, wallGroup)) {
        camera.position.copy(previousPosition);
    }
}

/**
 * 
 * @param {PerspectiveCamera} camera It is the camera object initialized to move along the space.
 * @param {Group} wallGroup The group that contains the surrounding walls.
 * @returns {Boolean} Whether or not the camera is colliding with any of the walls of the given wall group.
 */
function checkCollision(camera, wallGroup) {
    // Create a new Box3 Object to be stored as the user/camera.
    const userBoundingBox = new Box3();

    // By defining a Vector3 object, we can determine the position of the camera in the 3D Space.
    const cameraWorldPosition = new Vector3();

    // Using the Box3 and Vector3 objects, we get the position of the camera in the 3D Space.
    camera.getWorldPosition(cameraWorldPosition);

    // We then define a bounding box for the camera with 10 units in all axes, with center as the camera.
    // Setting the size of the bounding box a little large will make it seem as if there is a bit of gap b/w both objects.
    // Hence the bounding box will be positioned relative to the camera and the 3D space.
    userBoundingBox.setFromCenterAndSize(cameraWorldPosition, new Vector3(10, 10, 10));

    // Loop through Wall group array and check for collision of each wall with camera
    for (let i = 0; i < wallGroup.children.length; i++) {
        const wall = wallGroup.children[i]

        // For a taken wall, we set a BBox(BoundingBox), since each of the wall will only return a `Mesh{}`.
        // We do this because the bounding box of a Mesh will be null.
        wall.BBox = new Box3();
        wall.BBox.setFromObject(wall)

        // Check for intersection of the Wall's bounding box with the camera's bounding box.
        if (userBoundingBox.intersectsBox(wall.BBox)) {
            return true;
        }
    }

    return false;
}