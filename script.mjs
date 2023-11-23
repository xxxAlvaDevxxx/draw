class $2 {
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
    if (!this.element) throw Error("element is null");
    father.appendChild(this.element);
    return this;
  }
  addChildren(...children) {
    children.forEach((child) => {
      if (!this.element) throw Error("element is null");
      if (!child.element) throw Error("child is null");
      this.element.appendChild(child.element);
      this.children.push(child);
    });
    return this;
  }
  addChild(child) {
    if (!this.element) throw Error("element is null");
    if (!child.element) throw Error("child is null");
    this.element.appendChild(child.element);
    this.children.push(child);
    return this;
  }
  removeChildren(...children) {
    children.forEach((child) => {
      if (!this.element) throw Error("element is null");
      if (!child.element) throw Error("child is null");
      this.element.removeChild(child.element);
    });
  }
  createAndAppendFather(tag, father) {
    this.create(tag);
    this.father(father);
    return this;
  }
  setAttribute(name, value) {
    if (!this.element) throw Error("element is null");
    this.element.setAttribute(name, value);
    return this;
  }
  setAttributes(attributes) {
    if (typeof attributes != "object") throw Error("objects only");
    let arr = Object.entries(attributes);
    arr.forEach((arg) => {
      if (!this.element) throw Error("element is null");

      this.element.setAttribute(arg[0], arg[1]);
    });
    return this;
  }
  setClassNames(...classNames) {
    if (!this.element) throw Error("element is null");
    this.element.classList.add(...classNames);
    return this;
  }
  find(selector) {
    this.element = document.querySelector(selector);
    return this;
  }
  findChildren(selector) {
    if (!this.element) throw Error("element is null");
    return this.element.querySelector(selector);
  }
  text(text) {
    if (!this.element) throw Error("element is null");
    this.element.appendChild(document.createTextNode(text));
    return this;
  }
  event(callback) {
    if (!this.element) throw Error("element is null");
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
      this.element.removeChild(this.element.firstChild); // Elimina el primer hijo del elemento padre repetidamente
    }
  }
}

class $ extends $2 {
  constructor(create, attributes) {
    super();
    this.create(create);
    this.setAttributes(attributes);
  }
}

class Aside extends $2 {
  TodasLasPropiedadesBtn = new $("button", {}).text("todas las propiedades");
  propiedadesPrincipalesBtn = new $("button", {}).text(
    "Propiedades Principales"
  );
  controladorDeVistas = new $("article", {
    id: "controladorDeVistas",
  }).addChildren(this.TodasLasPropiedadesBtn, this.propiedadesPrincipalesBtn);
  contenedor = new $("div", {});
  constructor() {
    super();
    this.find("aside");
  }
  input($element) {
    if (typeof $element != "object") throw Error("debe de ser un objeto");
    this.removeAllChildren();
    // nombre de elemento
    let inputElementName = new $("input", {
      style: "border:0",
      value: $element.name,
    });
    inputElementName.element.onchange = (e) => {
      $element.name = e.target.value;
    };
    let title = new $("h1", {
        style: "font-size: medium;margin-top: 1em;margin-left: 2em;",
      }).addChild(inputElementName),
      //hr para dividir titulo con el contenido
      delimitadorDeTitulo = new $("hr", { style: "width: 80%;margin: auto;" });
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
      () =>
        this.vista($element, "todas las propiedades", this.TodasLasPropiedades),
      () => this.contenedor.removeAllChildren()
    );
    this.propiedadesPrincipalesBtn.onClick(
      () =>
        this.vista(
          $element,
          "propiedades principales",
          this.propiedadesPrincipales
        ),
      () => this.contenedor.removeAllChildren()
    );
  }
  vista($element, titulo, vista) {
    // reiniciar contenedor
    this.contenedor.removeAllChildren();
    // contenedor interno de la vista
    let contenedorInterno = new $("div", {
        class: "contenedorUnitarioDeTodasLasPropiedad",
      }),
      //titulo de vista
      title = new $("h1", {
        style: "font-size: medium;margin-top: 1em;margin-left: 2em;",
      }).text(titulo),
      //hr para dividir titulo con el contenido
      delimitadorDeTitulo = new $("hr", { style: "width: 80%;margin: auto;" });
    // obtener estilo de elemento que se le esta pasando
    let estilo = window.getComputedStyle($element),
      // formatear estos estilos para que sean un array con dos valores
      // [[key,value], ...]
      estiloFormat = Object.entries(estilo);
    // asignarle los hijos al contenedor, tanto el titulo como el delimitador
    contenedorInterno.addChildren(title, delimitadorDeTitulo);
    // callback de la vista que se quiere
    vista($element, this.contenedor, contenedorInterno, estiloFormat);
  }
  propiedadesPrincipales(
    $element,
    contenedor,
    contenedorInterno,
    estiloFormat
  ) {
    // codigo...
    console.log($element, contenedor, contenedorInterno, estiloFormat);
  }
  TodasLasPropiedades($element, contenedor, contenedorInterno, estiloFormat) {
    // for para obtener los nombre de las propiedades como su valor
    estiloFormat.forEach((propiedad, index) => {
      // ignorar los primeros 364 elementos,
      // dado que estos son la posicion de la propiedad y el nombre de la propiedad,
      // pero no devuelve el valor de la propiedad
      if (index <= 364) return;
      // crear elemento y asignarle como contenido el nombre de la propiedad llamada
      let key = new $("label", { class: "llaveDePropiedad" }).text(
        propiedad[0]
      );
      // crear elemento y asignarle como contenido el valor de la propiedad llamada
      let value = new $("input", {
        class: "valorDePropiedad",
        value: propiedad[1],
      });
      // agregar estos elementos a su contenedor
      contenedorInterno.addChildren(key, value);
      // agregar el contenedor a su padre
      contenedor.addChild(contenedorInterno);
      // cada que se modifique el valor de la propiedad se le insertara al elemento seleccionado
      value.element.onchange = (e) => {
        $element.style[propiedad[0]] = e.target.value;
      };
    });
  }
}

class Menu extends $ {
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

class Shape extends $ {
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
      this.onClick((e)=>{
        this.aside.input(this.element)
      })
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
      this.aside.removeAllChildren()
      this.menu.down();
    });
  }
  zIndexP(value) {
    let estilo = window.getComputedStyle(this.element);
    let zIndex = estilo.getPropertyValue("z-index");
    this.element.style.zIndex = parseInt(zIndex, 10) + value;
  }
}

class Rectangle extends Shape {
  constructor(menu) {
    super(menu);
    this.setClassNames("rectangle");
  }
}

class Circle extends Shape {
  constructor(menu) {
    super(menu);
    this.setClassNames("circle");
  }
}

class Draw extends $2 {
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

new Draw();
