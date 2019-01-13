import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div>
        Hello world from Main
      </div>
    )
  }
}

Main.displayName = Main

Main.propTypes = {}

Main.contextTypes = {}

export default Main

