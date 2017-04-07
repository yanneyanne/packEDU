class EduDOM {
/*
Elements are cloned when added and gotten from the DOM as it is designed to be read-only
*/
  constructor() {
    this.dom = []
  }

  addElement(elt) {
    let clonedElement = (JSON.parse(JSON.stringify(elt)))
    this.dom.push(clonedElement)
  }

  get(idx) {
    let clonedElement = (JSON.parse(JSON.stringify(this.dom[idx])))
    return clonedElement
  }

  size() {
    return this.dom.length
  }
  
  /* WARNING: This function should be used primarily for testing.
     The DOM should be read only and should thereby not grant access to the actual list of elements */
  getDOM() {
    return this.dom
  }

}

export default EduDOM
