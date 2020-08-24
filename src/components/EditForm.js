import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'


export default class EditForm extends Component {

    state = {
        todo: ''
    }

    componentDidMount() {
        let id = this.props.match.params.id
        axios.get(`${API_URL}/todos/${id}`, {withCredentials: true})
            .then((res) => {
                this.setState({
                    todo: res.data
                })
            })
    }

    handleNameChange = (e) => {
        let updatedTodo = JSON.parse(JSON.stringify(this.state.todo))
        updatedTodo.name = e.currentTarget.value //updating name
        this.setState({
            todo: updatedTodo
        })
    }

    handleDescChange = (e) => {
        let updatedTodo = JSON.parse(JSON.stringify(this.state.todo))
        updatedTodo.description = e.currentTarget.value //updating description
        this.setState({
            todo: updatedTodo
        })
    }

    render() {
        if (!this.state.todo){
            return <p>Loading ....</p>
        }

        const {name, description} = this.state.todo
        return (
            <>
            <input onChange={this.handleNameChange} name="name" type="text" placeholder="Enter Name" value={name}></input>
            <input onChange={this.handleDescChange} name="description" type="text" value={description} placeholder="Enter Description"></input>
            <button onClick={() => this.props.onEdit(this.state.todo)} type="submit">Edit</button>
            </>
        )
    }
}
