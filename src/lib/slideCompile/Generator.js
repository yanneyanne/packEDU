import * as types from './elementTypes'
import React from 'react'
import ReactNative from 'react-native'
import { View, Text, Button } from 'native-base'
import MultipleChoice from '../../containers/elements/MultipleChoice'

class Generator {
  /* TODO: This function takes a DOM tree and converts
     it into JSX to be rendered by React */
  static convertDOMtoJSX(dom) {
    let jsx = []
    for (let i = 0; i < dom.size(); i++) {
      let element = dom.get(i) 
      console.log("This is the element!")
      console.log(element)
      let jsxElement = this.mapElementToJSX(element)
      jsx.push(jsxElement)
    }
    return jsx
  }

  static mapElementToJSX(element) {
    switch(element.name) {
      case types.TEXT:
        return <Text> { element.content } </Text>
      case types.INTERACTION:
          if(element.type==types.INTERACTION_MULTIPLECHOICEQUIZ){
            // Hacky code to parse choices into separate list elements
            element.content = element.content.split("<choice>")
            element.content = element.content.map((choice) => choice.replace("</choice>",""))
            element.content.shift()
            return (
              <MultipleChoice choices = {element.content} evaluator = {element.evaluator} answer = {element.answer}/>
            )
          }
      default:
        return 
    }
  }
}

export default Generator
