/*
 * Published under the MIT license.
 * (c) 2020 Florian Beck
 */

import DisplayObject from "./displayObject.js";

export default class InteractiveObject extends DisplayObject {
  constructor(x, y, width, height, backgnd = undefined) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.backgnd = backgnd;
    this.parent = undefined;
    this.enabled = true;
  }
  enable(){
    this.enabled = true;
  }

  disable(){
    this.enabled = false;
  }

  draw() {
    if (this.backgnd != undefined) {
      image(this.backgnd, 0, 0, this.width, this.height);
    }
  }

  hitTest(x, y) {
    let e = this;
    let m = createVector(x, y);
    let s = 1;

    while (e != undefined) {
      let vt = createVector(e.x, e.y);
      if (e.parent != undefined) {
        vt.mult(e.parent.scale);
      }
      let vr = p5.Vector.fromAngle(e.rotation);
      let v = p5.Vector.sub(vt, vr);

      m = p5.Vector.sub(m, v);
      s *= e.scale;

      e = e.parent;
    }

    return (
      m.x > 0 && m.x < this.width * s &&
      m.y > 0 && m.y < this.height * s
    );
  }

  // hitTest(x, y) {
  //   let e = this;
  //   let m = createVector(x, y);
  //   let s = 1;

  //   while (e != undefined) {
  //     let vt = createVector(e.x, e.y);
  //     if (e.parent != undefined) {
  //       vt.mult(e.parent.scale);
  //     }
  //     let r = e.rotation;

  //     // let vr = p5.Vector.fromAngle(e.rotation);
  //     // let v = p5.Vector.sub(vt, vr);

  //     m = p5.Vector.sub(m, vt);
  //     m.x = m.x * cos(-r) - m.y * sin(-r) ;
  //     m.y = m.x * sin(-r) + m.y * cos(-r);
  //     s *= e.scale;

  //     e = e.parent;
  //   }

  //   return (
  //     m.x > 0 && m.x < this.width * s &&
  //     m.y > 0 && m.y < this.height * s
  //   );
  // }

  pressed() {}

  clicked() {}

  released() {}

  mousePressed() {
    if (this.enabled && this.hitTest(mouseX, mouseY)) {
      this.pressed();
    }
  }

  mouseClicked() {
    if (this.enabled && this.hitTest(mouseX, mouseY)) {
      this.clicked();
    }
  }

  mouseReleased() {
    if (this. enabled && this.hitTest(mouseX, mouseY)) {
      this.released();
    }
  }

  mouseHovered() {
    if (this.enabled && this.hitTest(mouseX, mouseY)) {
      return true;
    } else {
      return false;
    }
  }
}
