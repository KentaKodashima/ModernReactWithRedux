import './SeasonDisplay.css'
import React from 'react'

/* 
  Convention of orders
  1. Config
  2. Helper functions
  3. Cpmponent
*/

const seasonConfig = {
  summer: {
    text: "Let's hit the beach!",
    iconName: 'sun'
  },
  winter: {
    text: "Burr it is cold!",
    iconName: 'snowflake'
  }
}

const getSeason = (latitude, month) => {
  if (month > 2 && month < 9) {
    return latitude > 0 ? 'summer' : 'winter'
  } else {
    return latitude > 0 ? 'winter' : 'summer'
  }
}

const SeasonDisplay = props => {
  const season = getSeason(props.latitude, new Date().getMonth())
  // Instead of doing this, make a config at the top
  // const text = season === 'Winter' ? 'Burr, it is chilly' : 'Lets hit the beach'
  // const icon = season === 'Winter' ? 'snowflake' : 'sun'
  const { text, iconName } = seasonConfig[season] // { text, iconName }

  // Better to geve the component name as the class name for the root div
  return (
    <div className={`season-display ${season}`}>
      <i className={`icon-left ${iconName} icon massive`} />
      <h1>{text}</h1>
      <i className={`icon-right ${iconName} icon massive`} />
    </div>
  )
}

export default SeasonDisplay