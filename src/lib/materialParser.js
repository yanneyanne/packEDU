class Parser {
  static get slideOpener() {
    return "<slide>" 
  }

  static get slideCloser() {
    return "<\/slide>" 
  }

  static getSlide(pos, material) {
    let endOfSlidePos = material.slice(pos).search(Parser.slideCloser) + pos
    console.log("Next closer at " + endOfSlidePos)
    console.log("Slide will be " + material.slice(pos, endOfSlidePos))
    let currentSlide = material.slice(pos, endOfSlidePos).replace(Parser.slideOpener,"")
    return currentSlide
  }

  static getNextSlidePosition(pos, material) {
    let endOfSlidePos = material.slice(pos).search(Parser.slideCloser)
    let startOfNextSlide = endOfSlidePos + Parser.slideCloser.length
    console.log("In parser. Start of next slide is:" + startOfNextSlide)
    return startOfNextSlide
  }

  static getPreviousSlidePosition(pos, material) {
    return 0 
  }
}

export default Parser
