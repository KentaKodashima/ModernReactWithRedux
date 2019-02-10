# Modern React with Redux (2019)

## Babel
Babel is used for converting the newer versions of EcmaScript to ES5 which can run on all browsers.

## Component Lifecycle
1. Constructor  
Good place to do one time setup. Like viewDidLoad()
2. render()  
Avoid anything besides returning JSX.
3. componentDidMount  
Good place to do data loading.
4. componentDidUpdate  
Good place to do more data loading when state/props change.  
ex) Tapping a button and update the UI
5. componentWillMount  
Good place to cleanup. Like viewWillDissapear().

## Input
1. User types in input
2. Callback gets invoked
3. We call setState with the new value
4. Component rerenders
5. Input is told what its value is (coming from state)

```
class SearchBar extends React.Component {
  state = { term: '' }

  // e: event = an JS object which contains a bunch of information about the event just occured
  render() {
    return (
      <div className="ui segment">
        <form className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input 
              type="text"
              value={this.state.term}
              onChange={e => this.setState({ term: e.target.value })}
            />
          </div>
        </form>
      </div>
    )
  }
}
```

### Controlled Elements
React knows the value of the element.
It doesn't go look into DOM in order to get the value of input.

```
<input value={this.state.term} />

```

### Uncontrolled Elements
Only HTML knows the value of the element. (Store data inside of DOM)
It looks into DOM in order to get the value of input.

```
<input value="Hi there" />

```

## 'this' Keyword
'this' is used to refer to the instance of the component.
 
```
class Car {
  setDriveSound(sound) {
  	this.sound = sound
  }
  
  drive() {
  	return this.sound
  }
}

const car = new Car()
car.setDriveSound('vroom')
// 'this' inside of drive() refers to 'car' variable here.
car.drive()

const truck = {
  sound: 'putputput',
  driveMyTruck: car.drive // refers to 'truck' variable
}

truck.driveMyTruck()

const drive = car.drive
// drive() would be undifined because there is no object to be refered by 'this'
// drive()
```

### Solution
1. bind() in constructor

```
constructor() {
  this.drive = this.drive.bind(this)
}
```
2. Arrow function  
Arrow function automatically bind 'this'

```
// Before
onFormSubmit(event) = {
  // Prevent the page from refreshing
  event.preventDefault()

  console.log(this.state.term)
}

// After
onFormSubmit = (event) => {
  // Prevent the page from refreshing
  event.preventDefault()

  console.log(this.state.term)
}
```
3. Pass the function using arrow function
```
onSubmit={event => this.onFormSubmit(event)}
```

## React Refs  
- Gives access to a single DOM element
- We create refs in the constructor, assign them to instance variables, then pass to a particular JSX element as props

## Redux
### Redux Cycle
#### 1. Action Creator (Person dropping off the form)  
A function that is going to create or return a plain Javascript object (refered as an action) which has type property and a payload property. The type property on in-action describes some change that we want to make inside of our data. The payload property describes some contexts around the change that we want to make.

#### 2. Action (the form)  
The purpose of an action is to describe some changes we want to make to the data inside of our application. The action is the only way to change our redux app's state.

#### 3. dispatch (form receiver)  
The dispatch function takes in an action, and makes a copy of the object, then pass it off to a bunch of different places inside of our application.

#### 4. Reducers (each departments)  
The function that is responsible for taking in an action and some amount of existing data. It's going to process that action, and make some changes to the data, then return it so that it can be centralized in some other location.  

##### Rules
- Must return any value besides 'undefined'
- Produces 'state', or data to be used inside of the app using only previous state and action
- Must not return reach 'out of itself' to decide what value to return (reducers are pure)  
Only be allowed to use app's state and action.
- Must not mutate its input 'state' argument  
This is because if we mutate the state argument inside of the reducer, **the entire app will rerender**. We want to definitely avoid that.

```
Mutation:

// Array: push
const colors = ['red', 'blue']
colors.push('green')

// Array: pop
colors.pop('green')

// Object: Update an object
const person = { name: 'Sam' }
person.name = 'Alex'

// Object: Delete a key/value pair
delete person.name


Manipulation: // Create a brand new array, object, etc.

// Array: push
const colors = ['red', 'blue']
[...colors, 'green']

// Array: pop
colors.filter(color => color !== 'green') // return a brand new array without 'green'

// Object: Update an object
const person = { name: 'Sam' }
{ ...person, name: 'Alex', age: 30 } // Create a brand new object with different values

// Object: Delete a key/value pair
_.omit(person, 'name')

```

#### 5. State (compiled department data)  
The central repository of all information that has been created by a reducer.

```
console.clear()

// Action creators (people dropping off a form)

const createPolicy = (name, amount) => {
  return { // Return an action (a form)
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  }
}

const deletePolicy = name => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  }
}

const createClaim = (name, amountOfMoneyToCollect) => {
  return { // Return an action (a form)
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  }
}

// Reducers (each departments)

// Initialize with '= []' when there is no data
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    // We care about this action (form)
    // '...' means taking out the all elements and add them to a new array with action.payload
    // const numbers = [1, 2, 3]
    // [...numbers, 4] -> [1, 2, 3, 4]
    return [...oldListOfClaims, action.payload]
  }
  
  // // We don't care about this action (form)
  return oldListOfClaims
}

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    // We care about this action (form)
    return bagOfMoney - action.payload.amountOfMoneyToCollect
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount
  }
   
  // // We don't care about this action (form)
  return bagOfMoney
}

const policies = (oldListOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    // We care about this action (form)
    return [...oldListOfPolicies, action.payload.name]
  } else if (action.type === 'DELETE_POLICY') {
    return oldListOfPolicies.filter(name => name !== action.payload.name)
  }
  
  // // We don't care about this action (form)
  return oldListOfPolicies
}

const { createStore, combineReducers } = Redux

// Wire up all the functions using combineReducers()
const departments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
})

const store = createStore(departments)

const action = createPolicy('Alex', 20)

store.dispatch(action)
store.dispatch(createPolicy('Jim', 40))
store.dispatch(createPolicy('Bob', 30))

store.dispatch(createClaim('Alex', 120))
store.dispatch(createClaim('Jim', 50))

store.dispatch(deletePolicy('Bob'))

console.log(store.getState())
```

### Redux Cycle in an app
1. Call an action creator to change state of our app.
2. The action creator produce an action.
3. The action gets fed to a dispatch.
4. The dispatch forwards the action to reducers.
5. The reducers create new state.
6. The state wait until we need to update state again.

## React-Redux
- Provider  
The store from redux is passed into a Provider as props. The Provider offers the states from Redux to App component.

- Connect  
Create an instance of connect component which communicates with the Provider via context system.

```
function connect() {
	return function() {
  	return 'Hi, there!'
  }
}

connect()()
```

## Redux-Thunk
Redux-thunk is a middleware to help us make requests in a redux application.

It's essencially a bunch of functions to change redux store behavior, or adding additional functionalities.

### What it does
Redux-thunk makes the rules around Action Creator more flexible.

#### Action creator rules
- Action creators must return action objects
- Actions must have a type property
- Actions can optionally have a 'payload'

#### Rules with redux-thunk
- Action creators can return **actions objects** or **functions**
- If an action object gets returned, it must have a type property
- If an action object gets returned, it can optionally have a 'payload'

## General Data Loading Flow in Redux
1. Components gets rendered onto the screen
2. Component's 'componentDidMount' lifecycle method gets called
3. We call an action creator from 'componentDidMount'
4. Action creator runs code to make an API request
5. API responds with data
6. Action creator returns an 'action' with the fetched data on the 'payload' property
7. Some reducer sees the action, returns the data off the 'payload'
8. Because we generated some new state object, redux/react-redux cause our React app to be rendered

- 1 - 3  
Components are generally responsible for fetching data they need by calling an action creator

- 4 - 6  
Action creators are responsible for making API requests
(This is where redux-thunk comes into play)

- 7 & 8  
We get fetched data into a component by generating new state in our redux store, then getting that into our component through mapStateProps

## Async Process in Redux
### Problem 1
`await` and `async` doesn't work with an action creator basically, since it it is a new feature in a higher versions. When it gets converted to ES2015 by Babel, it cannot simply return a plain JS object.

```
export const fetchPosts = async () => {
  const response = await jsonPlaceholder.get('/posts')

  return {
    type: 'FETCH_POSTS',
    payload: response
  }
}
```

### Problem 2
Even though we don't use `await` and `async`, we still might not work as we expect. The example below doesn't work because there is **no data available by the time reducers run**.

```
export const fetchPosts = () => {
  const promise = jsonPlaceholder.get('/posts')

  return {
    type: 'FETCH_POSTS',
    payload: promise
  }
}
```

### Rule of Action Creator
- It has to return an plain JS object.

## Middlewares in Redux
Middlewares are needed to make asyncronous action creators in Redux.

### Terminology
- Synchronous action creator  
Instantly returns an action with data ready to go

- Asyncronous action creator
Takes some amount of time for it to get its data ready to go

### How it's like in Redux
- Function that gets called with every action we dispatch
- Has the ability to **STOP**, **MODIFY**, or otherwise mess around with actions
- Tons of open source middleware exist
- Most popular use of middleware is for dealing with async actions
- We are going to use a middleware called '**redux-thunk**' to solve our async issues

## Navigation with React Router
### Bad navigation in React/Redux app
Navigate around using `<a></a>` is a really bad practice in React/Redux app.  
The reason is that when the browser receives index.html file from the server, the browser dumps the old html file **including React/Redux state data**

### Navigating with React Router
Use `<Link></Link>` in React/Redux app to navigate.

- It prevents the browser from navigating to the new page and fetching new index.html file

**NOTE:** With react-router, each component needs to be designed to work in isolation (fetch its own data)

## Email/Password Authentication
- Store a record in a database with the user's email and password
- When the user tries to login, we compare email/pw with whats stored in DB
- A user is 'logged in' when they enter the correct email/pw

## OAuth-Based Authentication
- User authentications with outside service provider (Google, Facebook, Twitter)
- User authorizes our app to access their info
- Outside provider tells us about the user
- We are trusting the outside provider to correctly handle identification of a user
- OAuth can be used for (1) user identification in our app and (2) our app making actions on behalf of user

### OAuth for Servers
- Results in a 'token' that a server can use to make requests on behalf of the user
- Usually used when we have an app that needs to access user data **when they are not logged in**
- Difficult to setup because we need to store a list of info about the user

### OAuth for JS Browser App
- Results in a 'token' that a browser app can use to make requests on behalf of the user
- Usually used when we have an app that only needs to access user data **while they are logged in**
- Very easy to setup thanks to Google's JS lib to automate flow

### Steps for Setting Up OAuth (for Google)
- Create a new project at console.developers.google.com/
- Set up an OAuth confirmation screen
- Generate an OAuth Client ID
- Install Google's API library, initialize it with the OAuth Client ID
- Make sure the lib gets called any time the user clicks on the 'Login with Google' button

## Redux Form
```
renderInput(formProps) {
	return (
	  <input 
	    onChange={formProps.input.onChange} 
	    value={formProps.input.value} 
	  />
	)
}

// Shorthand 1
renderInput(formProps) {
	return <input {...formProps.input} />
}

// Shorthand 2
renderInput({ input }) {
	return <input {...input} />
}
```

## REST APIs
### Rest conventions
Rest conventions, or restful conventions are a predefined system for defining different routes on an API that work with a given type of records.

- Action  
	1. List all records
	2. Get one record
	3. Create record
	4. Update a record
	5. Delete a record

- Method  
    1. GET
    2. GET
    3. POST
    4. PUT
    5. DELETE

- Route
    1. /streams
    2. /streams:id/
    3. /streams
    4. /streams:id/
    5. /streams:id/

**Note:**  
PUT will update **all properties**.  
PATCH will **some properties**.

## Array-based Reducer VS. Object-based Reducer
```
// Array-based
const streamReducer = (state=[], action) => {
  switch (action.type) {
    case EDIT_STREAM:
      return state.map(stream => {
        if (stream.id === action.payload.id) {
          return action.payload
        } else {
          return stream
        }
      })
    default:
      return state
  }
}

// Object-based
// Use [] for the key interpolation
const streamReducer = (state={}, action) => {
  switch (action.type) {
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    default:
      return state
  }
}
```