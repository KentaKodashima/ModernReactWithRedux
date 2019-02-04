import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

class App extends React.Component {
  // constructor(props) {
  //   // Need to call super() because otherwise React.Component's constructor()
  //   super(props)

  //   this.state = { latitude: null, errorMessage: '' }
  // }

  state = { latitude: null, errorMessage: '' }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ latitude: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    )
  }

  componentDidUpdate() {
    console.log('My component was just updated - it rerendered')
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.latitude) {
      return <div>Error: {this.state.errorMessage}</div>
    } 

    if (!this.state.errorMessage && this.state.latitude) {
      return <SeasonDisplay latitude={this.state.latitude} />
    }

    return <Spinner message="Please accept location request" />
  }

  // render() might be called many times
  render() {
    return (
      // In order to apply the same div, wrap the logic inside of renderContent()
      <div className="border red">
        {this.renderContent()}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)