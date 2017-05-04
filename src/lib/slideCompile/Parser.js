import EduDOM from './EduDOM'

class Parser {
  static get slideOpener() {
    return "<slide>" 
  }

  static get slideCloser() {
    return "<\/slide>" 
  }

  // Returns the isolated content of one slide
  static isolateSlide(pos, material) {
    let endOfSlidePos = material.slice(pos).search(Parser.slideCloser) + pos
    let currentSlide = material.slice(pos, endOfSlidePos).replace(Parser.slideOpener, "")
    return currentSlide
  }

  // Returns an EduDOM. This is an object containing the element and it's attributes as well
  // as the content of said element
  static convertToDOM(material, dom = new EduDOM()) {
    while (material.length > 0) {
      let tagObj = this.parseOpeningTag(material)
      let element
      [element, material] = this.extractElement(tagObj.name, material)
      tagObj["content"] = element
      dom.addElement(tagObj)
    }
    return dom
  }

  // Returns an object representing a tag and its associated attributes and their values
  static parseOpeningTag(material) {
    let tagStart = material.indexOf("<") +1
    let tagEnd = material.indexOf(">")
    // Splits the tag into the tag name and all attributes
    let tagList = material.slice(tagStart, tagEnd).trim().split(/ (?=\w+=".+")/)
    let tagObj = this.tagListToObj(tagList)
    return tagObj
  }

  // Converts a list of a tag's name, attributes and attribute values to an object
  static tagListToObj(tagList) {
    let tagName = tagList.shift()
    let tagObj = {}
    tagObj["name"] = tagName
    tagList.forEach((attr) => {
      let splitAttr = attr.split("=")
      // Removes all quotations as well as removing whitespace
      tagObj[splitAttr[0]] = splitAttr[1].replace(/"/g, "").trim()
    })
    return tagObj
  }

  // Takes course material, extracts the first element and returns both the extracted
  // element and the lesson material left after the extraction
  static extractElement(tagName, material) {
    let openingTagEndPos = material.search(">") + 1
    let closingTagStartPos = material.search("</\s*" + tagName + "\s*>")
    let closingTagEndPos = material.indexOf(">", closingTagStartPos) + 1
    return [material.slice(openingTagEndPos, closingTagStartPos),
      material.slice(closingTagEndPos)]
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
