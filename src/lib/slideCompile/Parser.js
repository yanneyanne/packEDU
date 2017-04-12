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
  static convertToDOM(material, dom = new EduDOM()) {
    while (material.length>0) {
      let tagObj = this.parseFirstTag(material)
      let element
      [element, material] = this.extractElement(tagObj.name, material)
      tagObj["content"] = element
      dom.addElement(tagObj)
    }
    return dom
  }

  static extractElement(tagName, material) {
    let openingTagEndPos = material.search(">") + 1
    let closingTagStartPos = material.search("</\s*" + tagName + "\s*>")
    let closingTagEndPos = material.indexOf(">", closingTagStartPos) + 1
    return [material.slice(openingTagEndPos, closingTagStartPos),
      material.slice(closingTagEndPos)]
  }

  static parseFirstTag(material) {
    let tagStart = material.indexOf("<") +1
    let tagEnd = material.indexOf(">")
    let tagList = material.slice(tagStart, tagEnd).trim().split(" ")
    let tagObj = this.tagListToObj(tagList)
    return tagObj
  }

  static tagListToObj(tagList) {
    let tagName = tagList.shift()
    let tagObj = {}
    tagObj["name"] = tagName
    tagList.forEach((attr) => {
      let splitAttr = attr.split("=")
      tagObj[splitAttr[0]] = splitAttr[1]
    })
    return tagObj
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
