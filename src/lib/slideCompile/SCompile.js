import Parser from './Parser'
import Generator from './Generator'

class SCompile {

  static getSlide(pos, material) {
    let isolatedSlide = Parser.isolateSlide(pos, material) 
    let slideDOM = Parser.convertToDOM(isolatedSlide)
    console.log("This is the final DOM")
    console.log(slideDOM)
    let slide = Generator.convertDOMtoJSX(slideDOM)
    return isolatedSlide
  }

  static getNextSlidePosition(pos, material) {
    return Parser.getNextSlidePosition(pos, material)
  }

  static getPreviousSlidePosition(pos, material) {
    return Parser.getPreviousSlidePosition(pos, material)
  }
}

export default SCompile
