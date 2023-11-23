import { $, $2 } from "./Element";
import { Menu } from "./Menu";
import { Circle, Rectangle } from "./Shape/Shape";

export class Draw extends $2 {
  rectangleBtn = new $("button", { id: "rectangleBtn" }).text("Rectangulo");
  circleBtn = new $("button", { id: "circleBtn" }).text("Circulo");
  receptor = new $2().find("#receptor");
  menu = new Menu();
  constructor() {
    super();
    this.find("main");
    this.eventos();
  }
  eventos() {
    let down = false;
    //let hover = new $('div',{'id':'hover'})
    this.receptor.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.menu.up(e);
      this.menu.addChildren(this.rectangleBtn, this.circleBtn);
    });
    /* this.receptor.element.onmousedown = (e) =>{
                down = true
                this.addChild(hover)
                hover.element.style.top = e.clientY+"px"
                hover.element.style.left = e.clientX+"px"
            }
            this.receptor.element.onmousemove = (e) =>{
                if (!down) return
                hover.element.style.width = (e.clientX-300)+'px'
                hover.element.style.height = (e.clientY-220)+'px'
                //this.element.getBoundingClientRect().left
                //hover.element.style.width = '200px'
                //hover.element.style.height = '200px'
            }
            this.receptor.element.onmouseup = () => {
                down = false
                hover.element.style.width = 0
                hover.element.style.height = 0
            } */
    this.receptor.onClick(() => {
      this.menu.down();
    });
    this.rectangleBtn.onClick((e) => {
      this.menu.down();
      new Rectangle(this.menu).fill(e, this.element);
    });
    this.circleBtn.onClick((e) => {
      this.menu.down();
      new Circle(this.menu).fill(e, this.element);
    });
  }
}