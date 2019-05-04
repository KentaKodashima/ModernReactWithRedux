import React, { useState } from 'react'

import ResourceList from './ResourceList'
import UserList from './UserList'

const App = () => {
  const [resource, setResoource] = useState('posts')

  return (
    <div>
      <UserList />
      <div>
        <button onClick={() => setResoource('posts')}>Posts</button>
        <button onClick={() => setResoource('todos')}>ToDos</button>
      </div>
      <ResourceList resource={resource} />
    </div>
  )
}

export default App
