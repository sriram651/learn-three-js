import { TextureLoader } from "three";

export function loadTexture(imageUrl) {
    const texture = new TextureLoader().load(imageUrl);

    return texture;
}