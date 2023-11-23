import { $, $2 } from "./Element";

export class Aside extends $2 {
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