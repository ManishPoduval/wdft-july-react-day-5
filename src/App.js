import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Nav from './components/Nav'
import TodoList from './components/TodoList'
import TodoDetails from './components/TodoDetails'
import AddForm from './components/AddForm'
import EditForm from './components/EditForm'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import axios from 'axios'
import {API_URL} from './config'
import {Switch, Route, withRouter} from 'react-router-dom'

class App extends React.Component {

  state = {
    todos: [], 
    loggedInUser: null,
  }

  componentDidMount(){
    axios.get(`${API_URL}/todos`)
      .then((res) => {
          this.setState({
            todos: res.data
          })
      })
    if (!this.state.loggedInUser){
      axios.get(`${API_URL}/user`, {withCredentials: true})
      .then((res) => {
          this.setState({
            loggedInUser: res.data
          })
      })
    }  
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {name, description, image} = e.currentTarget
    console.log(image.files[0])

    let uploadData = new FormData()
    uploadData.append('imageUrl', image.files[0])

    axios.post(`${API_URL}/upload`, uploadData)
      .then((response) => {
        axios.post(`${API_URL}/create`, {
          name: name.value,
          description: description.value, 
          completed: false,
          image: response.data.image
        }, {withCredentials: true})
        .then((res) => {
          //redirect
          let newTodo = res.data
          let cloneTodos = JSON.parse(JSON.stringify(this.state.todos))
          cloneTodos.unshift(newTodo)
          this.setState({
            todos: cloneTodos
          }, () => {
            this.props.history.push('/')
          })
          
        })
      })
  }
  

  handleDelete = (id) => {
    axios.delete(`${API_URL}/todos/${id}`, {withCredentials: true})
      .then(() => {
          
        let filteredTodos = this.state.todos.filter((todo) => {
          return todo._id !== id
        })

        this.setState({
          todos: filteredTodos
        }, () => {
          this.props.history.push('/')
        })

      })
  }

  handleEdit = (updatedTodo) => {
    axios.patch(`${API_URL}/todos/${updatedTodo._id}`, {
      name: updatedTodo.name,
      description: updatedTodo.description, 
      completed: updatedTodo.completed
    },  {withCredentials: true})
    .then(() => {
        //Use a map to always return a new array. ForEach does not
        // Please note that down. 
        let cloneTodos = this.state.todos.map((todo) => {
            if (todo._id === updatedTodo._id) {
              todo = updatedTodo 
            }
            return todo
        })
        this.setState({
          todos: cloneTodos
        }, () => {
          this.props.history.push('/')
        })
    })
  }
  
  handleLogOut = (e) => {
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      .then(() => {
        this.setState({
          loggedInUser: null
        }, ()=>{
          this.props.history.push('/')
        })
      })
  }
  
  handleSignIn = (e) => {
    e.preventDefault();
    const {email, password} = e.currentTarget;
  
    axios.post(`${API_URL}/signin`, {
      email: email.value, 
      password: password.value
    },{withCredentials: true})
      .then((res) => {
        console.log(res)
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/')
        })
      })  
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const {username, email, password} = e.currentTarget;
  
    axios.post(`${API_URL}/signup`, {
      username: username.value,
      email: email.value, 
      password: password.value
    },  {withCredentials: true})
      .then((res) => {
        console.log(res)
        this.setState({
          loggedInUser: res.data
        } ,() => {
          this.props.history.push('/')
        })
      })  
  }

  render() {
    return (
      <div>
        <Nav loggedInUser={this.state.loggedInUser} onLogout={this.handleLogOut} />
        <Switch >
          <Route exact path="/" render={() => {
            return <TodoList todos={this.state.todos}/>
          }} />
          <Route path="/create-todo" render={(routeProps) => {
            return <AddForm  onSubmit={this.handleSubmit} {...routeProps}/>
          }} />
          <Route exact path="/todo/:id" render={(routeProps) => {
            return <TodoDetails loggedInUser={this.state.loggedInUser} onDelete={this.handleDelete} {...routeProps}/>
          }}/>
          <Route path="/todo/:id/edit" render={(routeProps) => {
            return <EditForm onEdit={this.handleEdit} {...routeProps}/>
          }}/>
          <Route path="/sign-in" render={(routeProps) => {
            return <SignIn onSignIn={this.handleSignIn} {...routeProps} />
          }}/>
          <Route path="/sign-up" render={(routeProps) => {
            return <SignUp onSignUp={this.handleSignUp} {...routeProps} />
          }}/>
        </Switch>
      </div>
    )
  }
}


export default withRouter(App)
