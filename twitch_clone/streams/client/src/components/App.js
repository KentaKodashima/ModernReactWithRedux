import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import StreamCreate from './streams/StreamCreate'
import StreamDelete from './streams/StreamDelete'
import StreamEdit from './streams/StreamEdit'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import Header from './Header'
import history from '../history'

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          {/* exact means the path has to exactly the same as the extracted path */}
          {/* Colon means it's going to be replaced by a variable, so it is a param */}
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App