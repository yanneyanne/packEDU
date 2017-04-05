import EduDOM from './EduDOM' 

class Parser {
  static get slideOpener() {
    return "<slide>" 
  }

  static get slideCloser() {
    return "<\/slide>" 
  }

  static isolateSlide(pos, material) {
    let endOfSlidePos = material.slice(pos).search(Parser.slideCloser) + pos
    let currentSlide = material.slice(pos, endOfSlidePos).replace(Parser.slideOpener, "")
    return currentSlide
  }

  /* TODO: This function should convert a string of markup to a
    DOM tree */
  static convertToDOM(material, dom = new EduDOM(), parents = []) {
    let [tagName, attributes] = this.parseTag(material)
    console.log(tagName)
    console.log(attributes)
    return material
  }

  static parseTag(material) {
    let tagStart = material.indexOf("<") +1
    let tagEnd = material.indexOf(">")
    let tag = material.slice(tagStart, tagEnd).trim().split(" ")
    let attributes = []
    let tagName = tag.shift()
    tag.forEach((attr) => {
      attributes.push(attr.split("="))
    })
    return [tagName, attributes]
  }

  static getNextSlidePosition(pos, material) {
    let endOfSlidePos = material.indexOf(Parser.slideCloser, pos) 
    let startOfNextSlide = material.indexOf(Parser.slideOpener, endOfSlidePos)
    return startOfNextSlide
  }

  static getPreviousSlidePosition(pos, material) {
    let startOfPrevSlide = material.lastIndexOf(Parser.slideOpener, pos-1) 
    return startOfPrevSlide
  }
}

export default Parser
