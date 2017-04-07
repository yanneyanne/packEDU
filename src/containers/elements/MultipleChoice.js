import React, { Component } from 'react'
import {View, Text, Button} from 'native-base'

class MultipleChoice extends Component {

  choose(choice) {
    console.log(choice) 
  }

  render() {
    return (
      <View>
        {this.props.choices.map((choice) =>
            <Button key={choice} onPress={() => this.choose(choice)}>
              <Text>
              {choice}
              </Text>
            </Button>
        )}
      </View>
    )
  }
}

export default MultipleChoice
