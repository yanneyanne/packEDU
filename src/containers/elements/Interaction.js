import React, { Component } from 'react'
import { connect } from 'react-redux'

export default class Interaction extends Component {

  componentDidMount() {
    console.log("Mounting interaction")
    this.props.addInteraction(this.props.currentSlidePos) 
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentSlidePos !== this.props.currentSlidePos) 
      this.props.addInteraction(this.props.currentSlidePos)
  }

  answer(input) {
    let evaluator = this.props.evaluator
    let ansKey = this.props.answer
    let currentSlidePos = this.props.currentSlidePos
    this.props.validateInteraction(currentSlidePos, input, evaluator, ansKey)
  }

  isAnswered() {
    return typeof this.props.input !== 'undefined' 
  }

  render() {
    if (this.method === undefined) {
      throw new TypeError('Interaction is an abstract component and cannot be rendered!') 
    }
  }
}
