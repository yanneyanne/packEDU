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
  static convertToDOM(material) {
    return material
  }
}

export default Parser
