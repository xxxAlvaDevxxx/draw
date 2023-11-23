(() => {
  // src/Element.js
  var $2 = class {
    element;
    children = [];
    status = false;
    create(tag) {
      this.element = document.createElement(tag);
      return this;
    }
    father(father) {
      father.addChildren(this);
      return this;
    }
    fatherElement(father) {
      if (!this.element)
        throw Error("element is null");
      father.appendChild(this.element);
      return this;
    }
    addChildren(...children) {
      children.forEach((child) => {
        if (!this.element)
          throw Error("element is null");
        if (!child.element)
          throw Error("child is null");
        this.element.appendChild(child.element);
        this.children.push(child);
      });
      return this;
    }
    addChild(child) {
      if (!this.element)
        throw Error("element is null");
      if (!child.element)
        throw Error("child is null");
      this.element.appendChild(child.element);
      this.children.push(child);
      return this;
    }
    removeChildren(...children) {
      children.forEach((child) => {
        if (!this.element)
          throw Error("element is null");
        if (!child.element)
          throw Error("child is null");
        this.element.removeChild(child.element);
      });
    }
    createAndAppendFather(tag, father) {
      this.create(tag);
      this.father(father);
      return this;
    }
    setAttribute(name, value) {
      if (!this.element)
        throw Error("element is null");
      this.element.setAttribute(name, value);
      return this;
    }
    setAttributes(attributes) {
      if (typeof attributes != "object")
        throw Error("objects only");
      let arr = Object.entries(attributes);
      arr.forEach((arg) => {
        if (!this.element)
          throw Error("element is null");
        this.element.setAttribute(arg[0], arg[1]);
      });
      return this;
    }
    setClassNames(...classNames) {
      if (!this.element)
        throw Error("element is null");
      this.element.classList.add(...classNames);
      return this;
    }
    find(selector) {
      this.element = document.querySelector(selector);
      return this;
    }
    findChildren(selector) {
      if (!this.element)
        throw Error("element is null");
      return this.element.querySelector(selector);
    }
    text(text) {
      if (!this.element)
        throw Error("element is null");
      this.element.appendChild(document.createTextNode(text));
      return this;
    }
    event(callback) {
      if (!this.element)
        throw Error("element is null");
      callback(this.element);
      return this;
    }
    onClick(callback, backfn = false) {
      this.element.onclick = (e) => {
        if (this.status && backfn) {
          this.status = false;
          return backfn();
        }
        this.status = true;
        return callback(e);
      };
    }
    removeAllChildren() {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
    }
  };
  var $ = class extends $2 {
    constructor(create, attributes) {
      super();
      this.create(create);
      this.setAttributes(attributes);
    }
  };

  // src/Menu.js
  var Menu = class extends $ {
    constructor() {
      super("menu", {});
    }
    up(e) {
      if (this.status)
        return this.down();
      this.setAttributes({ style: `top:${e.clientY}px;left:${e.clientX}px` });
      this.fatherElement(document.body);
      this.status = true;
    }
    down() {
      if (!this.status)
        return;
      document.body.removeChild(this.element);
      this.status = false;
      this.reiniciarHijosMenu();
    }
    reiniciarHijosMenu() {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
    }
  };

  // src/Aside.js
  var Aside = class extends $2 {
    TodasLasPropiedadesBtn = new $("button", {}).text("todas las propiedades");
    propiedadesPrincipalesBtn = new $("button", {}).text(
      "Propiedades Principales"
    );
    controladorDeVistas = new $("article", {
      id: "controladorDeVistas"
    }).addChildren(this.TodasLasPropiedadesBtn, this.propiedadesPrincipalesBtn);
    contenedor = new $("div", {});
    constructor() {
      super();
      this.find("aside");
    }
    input($element) {
      if (typeof $element != "object")
        throw Error("debe de ser un objeto");
      this.removeAllChildren();
      let inputElementName = new $("input", {
        style: "border:0",
        value: $element.name
      });
      inputElementName.element.onchange = (e) => {
        $element.name = e.target.value;
      };
      let title = new $("h1", {
        style: "font-size: medium;margin-top: 1em;margin-left: 2em;"
      }).addChild(inputElementName), delimitadorDeTitulo = new $("hr", { style: "width: 80%;margin: auto;" });
      this.addChildren(
        title,
        delimitadorDeTitulo,
        this.controladorDeVistas,
        this.contenedor
      );
      this.events($element);
    }
    events($element) {
      this.TodasLasPropiedadesBtn.onClick(
        () => this.vista($element, "todas las propiedades", this.TodasLasPropiedades),
        () => this.contenedor.removeAllChildren()
      );
      this.propiedadesPrincipalesBtn.onClick(
        () => this.vista(
          $element,
          "propiedades principales",
          this.propiedadesPrincipales
        ),
        () => this.contenedor.removeAllChildren()
      );
    }
    vista($element, titulo, vista) {
      this.contenedor.removeAllChildren();
      let contenedorInterno = new $("div", {
        class: "contenedorUnitarioDeTodasLasPropiedad"
      }), title = new $("h1", {
        style: "font-size: medium;margin-top: 1em;margin-left: 2em;"
      }).text(titulo), delimitadorDeTitulo = new $("hr", { style: "width: 80%;margin: auto;" });
      let estilo = window.getComputedStyle($element), estiloFormat = Object.entries(estilo);
      contenedorInterno.addChildren(title, delimitadorDeTitulo);
      vista($element, this.contenedor, contenedorInterno, estiloFormat);
    }
    propiedadesPrincipales($element, contenedor, contenedorInterno, estiloFormat) {
      console.log($element, contenedor, contenedorInterno, estiloFormat);
    }
    TodasLasPropiedades($element, contenedor, contenedorInterno, estiloFormat) {
      estiloFormat.forEach((propiedad, index) => {
        if (index <= 364)
          return;
        let key = new $("label", { class: "llaveDePropiedad" }).text(
          propiedad[0]
        );
        let value = new $("input", {
          class: "valorDePropiedad",
          value: propiedad[1]
        });
        contenedorInterno.addChildren(key, value);
        contenedor.addChild(contenedorInterno);
        value.element.onchange = (e) => {
          $element.style[propiedad[0]] = e.target.value;
        };
      });
    }
  };

  // src/Shape/Shape.js
  var Shape = class extends $ {
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
      var offsetX, offsetY = false;
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
          x = Math.min(x, window.innerWidth - this.element.clientWidth);
          y = Math.min(y, window.innerHeight - this.element.clientHeight);
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
  };
  var Rectangle = class extends Shape {
    constructor(menu) {
      super(menu);
      this.setClassNames("rectangle");
    }
  };
  var Circle = class extends Shape {
    constructor(menu) {
      super(menu);
      this.setClassNames("circle");
    }
  };

  // src/Draw.js
  var Draw = class extends $2 {
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
      this.receptor.element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        this.menu.up(e);
        this.menu.addChildren(this.rectangleBtn, this.circleBtn);
      });
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
  };

  // src/main.js
  new Draw();
})();
