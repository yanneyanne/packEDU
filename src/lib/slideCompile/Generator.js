import * as types from './elementTypes'

class Generator {
  /* TODO: This function takes a DOM tree and converts
     it into JSX to be rendered by React */
  static convertDOMtoJSX(dom) {
    let jsx = ""
    for (let i = 0; i < dom.size(); i++) {
      let element = dom.get(i) 
      let jsxElement = this.mapElementToJSX(element)
      jsx += jsxElement
    }
    return jsx
  }

  static mapElementToJSX(element) {
    switch(element.name) {
      case types.TEXT:
        return "<Text>" + element.content + "<Text>"
      default:
        return ""
    }
  }
}

export default Generator
