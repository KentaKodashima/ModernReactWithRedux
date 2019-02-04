// Import the React and ReactDOM libraries
import React from 'react'
import ReactDOM from 'react-dom'

// Create a React component
const App = () => {
  // const buttonText = 123456
  // const buttonText = ['Hi', 'There']
  // const buttonText = { text: 'Click Me!' }
  const buttonText = 'Click Me!'
  const style = { backgroundColor: 'blue', color: 'white' }
  const enterName = 'Enter name:'

  return (
    <div>
      <label className="label" htmlFor="name">
        {enterName}
      </label>
      <input id="name" type="text" />
      <button style={style}>
        {buttonText}
        {/* {buttonText.text} */}
      </button>
    </div>
  )
}

// Take the React Component and show it on the screen
ReactDOM.render(
  <App />,
  document.querySelector('#root')
)