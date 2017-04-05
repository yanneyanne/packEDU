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

  static getNextSlidePosition(pos, material) {
    let endOfSlidePos = material.indexOf(Parser.slideCloser, pos) 
    let startOfNextSlide = material.indexOf(Parser.slideOpener, endOfSlidePos)
    return startOfNextSlide
  }

  static getPreviousSlidePosition(pos, material) {
    let startOfPrevSlide = material.lastIndexOf(Parser.slideOpener, pos-1) 
    return startOfPrevSlide
  }

  /* TODO: This function should convert a string of markup to a
    DOM tree */
  static convertToDOM(material) {
    
    return material
  }
}

export default Parser
