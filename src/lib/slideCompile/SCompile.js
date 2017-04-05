import Parser from './Parser'
import Generator from './Generator'

class SCompile {

  static getSlide(pos, material) {
    let isolatedSlide = Parser.isolateSlide(pos, material) 
    let slideDOM = Parser.convertToDOM(isolatedSlide)
    let slide = Generator.convertDOMtoJSX(slideDOM)
    return slide
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

export default SCompile
