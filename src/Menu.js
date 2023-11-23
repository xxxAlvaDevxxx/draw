import { $ } from "./Element";

export class Menu extends $ {
    constructor() {
      super("menu", {});
    }
    up(e) {
      if (this.status) return this.down();
      this.setAttributes({ style: `top:${e.clientY}px;left:${e.clientX}px` });
      this.fatherElement(document.body);
      this.status = true;
    }
    down() {
      if (!this.status) return;
      document.body.removeChild(this.element);
      this.status = false;
      this.reiniciarHijosMenu();
    }
    reiniciarHijosMenu() {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild); // Elimina el primer hijo del elemento padre repetidamente
      }
    }
  }