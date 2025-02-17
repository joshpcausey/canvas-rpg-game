import { Vector2 } from './Vector2';

export class Sprite {
  constructor({
    resource, // image we want to draw
    frameSize, // size of the crop of the image
    hFrames, // how the sprite is arranged horizontally
    vFrames, // how the sprite is arrange vertically
    frame, // which frame we want to show
    scale, // how large to draw this image
    position, // where to draw it (top left corner)
  }) {
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
        frameCount++;
      }
    }
  }

  drawImage(ctx, x, y) {
    if (!this.resource.isLoaded) {
      return;
    }

    // Find correct sprite sheet frame to use
    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY, // The Y corner of frame
      frameSizeX, // How much crop from the sprite sheet (x)
      frameSizeY, // How much crop from the sprite sheet (y)
      x, // Where to place this on the canvas tag (x)
      y, // Where to place this on the canvas (y)
      frameSizeX * this.scale, // How large to scale it (x)
      frameSizeY * this.scale // How large to scale it (y)
    );
  }
}
