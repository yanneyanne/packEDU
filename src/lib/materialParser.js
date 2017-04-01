class Parser {
  static getSlide(pos, material) {
    let endOfSlidePos = material.slice(pos).search("<\/slide>")
    let currentSlide = material.slice(pos, endOfSlidePos).replace("<slide>","")
    return currentSlide
  }
}

export default Parser
