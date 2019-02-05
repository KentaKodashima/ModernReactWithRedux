import React from 'react'
import { connect } from 'react-redux'

class UserHeader extends React.Component {
  // This lifecycle method gets called every time the new components are rendered
  render() {
    const { user } = this.props
    
    if (!user) {
      return null
    }

    return (
      <div className="header">{user.name}</div>
    )
  }
}

// ownProps is needed to get userId from the component's props
const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user.id === ownProps.userId) }
}

export default connect(mapStateToProps)(UserHeader)