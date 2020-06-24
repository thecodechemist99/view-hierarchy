/*
 * Published under the MIT license.
 * (c) 2020 Florian Beck
 */

import InteractiveObject from "./interactiveObject.js";

export default class Sprite extends InteractiveObject {
  constructor(x, y, width, height, backgnd = undefined) {
    super(x, y, width, height, backgnd);
    this.children = [];
  }

  display() {
    if (this.visible) {
      push();
      translate(this.x, this.y);
      rotate(this.rotation);
      scale(this.scale);

      this.draw();

      for (let elem of this.children) {
        elem.display();
      }

      pop();
    }
  }

  pressed() {
    this.children.forEach((sprite) => {
      sprite.mousePressed();
    });
  }

  clicked() {
    this.children.forEach((sprite) => {
      sprite.mouseClicked();
    });
  }

  released() {
    this.children.forEach((sprite) => {
      sprite.mouseReleased();
    });
  }

  addChild(sprite) {
    sprite.parent = this;
    this.children.push(sprite);
  }

  removeChild(sprite) {
    let index = this.children.indexOf(sprite);
    if (index != -1) {
      sprite.parent = undefined;
      this.children.splice(index, 1);
    }
  }
}
