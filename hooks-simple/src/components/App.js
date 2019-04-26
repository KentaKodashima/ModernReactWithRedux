import React, { useState } from 'react'

import ResourceList from './ResourceList'

const App = () => {
  const [resource, setResoource] = useState('posts')

  return (
    <div>
      <div>
        <button onClick={() => setResoource('posts')}>Posts</button>
        <button onClick={() => setResoource('todos')}>ToDos</button>
      </div>
      <ResourceList resource={resource} />
    </div>
  )
}

export default App
