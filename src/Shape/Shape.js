import { Aside } from "../Aside";
import { $ } from "../Element";

export class Shape extends $ {
  subirZIndex = new $("button", {}).text("subir Nivel");
  bajarZIndex = new $("button", {}).text("bajar nivel");
  deleteBtn = new $("button", {}).text("Eliminar");
  father;
  stateMov = false;
  menu;
  aside = new Aside();
  constructor(menu) {
    super("div", { class: "shape" });
    this.eventos();
    this.menu = menu;
    this.element.style.zIndex = 9999;
  }
  fill(e, father) {
    this.setAttributes({ style: `top:${e.clientY}px;left:${e.clientX}px` });
    this.fatherElement(father);
    this._father = father;
  }
  eventos() {
    var offsetX,
      offsetY = false;
    this.onClick((e) => {
      this.aside.input(this.element);
    });
    this.element.oncontextmenu = (e) => {
      e.preventDefault();
      this.menu.addChildren(this.subirZIndex, this.bajarZIndex, this.deleteBtn);
      this.menu.up(e);
    };
    this.element.onmousedown = (e) => {
      this.menu.down();
      this.stateMov = true;
      offsetX = e.clientX - this.element.getBoundingClientRect().left;
      offsetY = e.clientY - this.element.getBoundingClientRect().top;
    };
    this.element.onmousemove = (e) => {
      if (this.stateMov) {
        var x = e.clientX - offsetX;
        var y = e.clientY - offsetY;

        // Limitar la posición dentro del viewport
        x = Math.min(x, window.innerWidth - this.element.clientWidth);
        y = Math.min(y, window.innerHeight - this.element.clientHeight);

        // Evitar que el div se salga del lado izquierdo y superior del viewport
        x = Math.max(x, 0);
        y = Math.max(y, 0);

        this.element.style.top = y + "px";
        this.element.style.left = x + "px";
      }
    };
    this.element.onmouseup = () => {
      this.stateMov = false;
    };
    this.bajarZIndex.onClick(() => {
      this.zIndexP(-1);
    });
    this.subirZIndex.onClick(() => {
      this.zIndexP(1);
    });
    this.deleteBtn.onClick(() => {
      this._father.removeChild(this.element);
      this.aside.removeAllChildren();
      this.menu.down();
    });
  }
  zIndexP(value) {
    let estilo = window.getComputedStyle(this.element);
    let zIndex = estilo.getPropertyValue("z-index");
    this.element.style.zIndex = parseInt(zIndex, 10) + value;
  }
}

export class Rectangle extends Shape {
  constructor(menu) {
    super(menu);
    this.setClassNames("rectangle");
  }
}

export class Circle extends Shape {
  constructor(menu) {
    super(menu);
    this.setClassNames("circle");
  }
}
