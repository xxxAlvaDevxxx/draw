export class $2 {
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

export class $ extends $2 {
  constructor(create, attributes) {
    super();
    this.create(create);
    this.setAttributes(attributes);
  }
}
