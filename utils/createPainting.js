import * as THREE from "three";

/**
 * 
 * @param {string} imageUrl The Image path that will be set as the texture of the plane geometry.
 * @param {number} width Width of the plane geometry.
 * @param {number} height Height of the plane geometry.
 * @param {THREE.Vector3} position A Vector3 Object representing the position of the plane in the scene.
 * @returns the Plane along with the texture, geometry, and position.
 */
export default function createPainting(imageUrl, width, height, position) {
    const paintingTextureLoader = new THREE.TextureLoader();
    const paintingTexture = paintingTextureLoader.load(imageUrl);
    const paintingMaterial = new THREE.MeshBasicMaterial({ map: paintingTexture, side: THREE.DoubleSide });
    const paintingGeometry = new THREE.PlaneGeometry(width, height);

    const paintingMesh = new THREE.Mesh(paintingGeometry, paintingMaterial);
    paintingMesh.position.set(position.x, position.y, position.z)

    return paintingMesh;
}