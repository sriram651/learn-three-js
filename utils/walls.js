import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

/**
 * 
 * @param {MeshBasicMaterialParameters} materialOptions 
 * @returns {Mesh} Created mesh using `BoxGeometry` and `MeshBasicMaterial`
 */
export function createWall(materialOptions) {

    // NOTE: Instead of creating separate variables for each wall's geometry and mesh, we assign them directly.
    const wallGeometry = new Mesh(
        new BoxGeometry(100, 50, 0.01),
        new MeshBasicMaterial(materialOptions)
    );

    return wallGeometry;
}