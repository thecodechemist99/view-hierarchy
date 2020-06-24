/*
 * Published under the MIT license.
 * (c) 2020 Florian Beck
 */

import EventDispatcher from "./eventDispatcher.js"

export default class DisplayObject extends EventDispatcher { 
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.scale = 1;
    this.rotation = 0;
    this.visible = true;
  }

  draw() {}

  display() {
    if (this.visible) {
      push();
      translate(this.x, this.y);
      rotate(this.rotation);
      scale(this.scale);

      this.draw();

      pop();
    }
  }
}
