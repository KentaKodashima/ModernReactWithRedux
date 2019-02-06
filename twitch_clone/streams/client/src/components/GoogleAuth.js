import React from 'react'
import { constants } from '../constants'

class GoogleAuth extends React.Component {
  state = { isSigneedIn: null }

  componentDidMount() {
    // Initialize the client-side library JS codes to use it in the app
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: constants.GOOGLE_API_CLIENT_KEY,
        scope: 'email'
      }).then(() => {
        // Generate this.auth and set component's state
        this.auth = window.gapi.auth2.getAuthInstance()
        this.setState({ isSigneedIn: this.auth.isSigneedIn.get() })
      })
    })
  }

  renderAuthButton() {
    if (this.state.isSigneedIn === null) {
      return <div>I don't know if we're signed in.</div>
    } else if (this.state.isSigneedIn) {
      return <div>We're signed in.</div>
    } else {
      return <div>We're not signed in.</div>
    }
  }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}

export default GoogleAuth