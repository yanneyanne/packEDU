class EduDOM {

  constructor() {
    this.dom = []
  }

  addElement(elt) {
    this.dom.push(elt)
    console.log("The dom is currently")
    console.log(this.dom)
  }

}

export default EduDOM
