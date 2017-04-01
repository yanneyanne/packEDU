class Parser {
  static get slideOpener() {
    return "<slide>" 
  }

  static get slideCloser() {
    return "<\/slide>" 
  }

  static getSlide(pos, material) {
    let endOfSlidePos = material.slice(pos).search(Parser.slideCloser) + pos
    let currentSlide = material.slice(pos, endOfSlidePos).replace(Parser.slideOpener,"")
    return currentSlide
  }

  static getNextSlidePosition(pos, material) {
    let endOfSlidePos = material.slice(pos).search(Parser.slideCloser) + pos
    let startOfNextSlide = endOfSlidePos + Parser.slideCloser.length
    return startOfNextSlide
  }

  static getPreviousSlidePosition(pos, material) {
    let startOfPrevSlide = material.slice(0, pos).lastIndexOf(Parser.slideOpener)
    return startOfPrevSlide
  }
}

export default Parser
