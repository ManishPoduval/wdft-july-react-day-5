import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'
import {Link} from 'react-router-dom'


class TodoDetails extends Component {

    state = {
        todo: ''
    }

    componentDidMount() {
        let id = this.props.match.params.id
        axios.get(`${API_URL}/todos/${id}`)
            .then((res) => {
                this.setState({
                    todo: res.data
                })
            })
    }

    render() {
        if (!this.state.todo){
            return <p>Loading ....</p>
        }

        const {name, description, _id} = this.state.todo

        return (
            <div>
                <p>{name}</p>
                <p>{description}</p>
                <Link to={`/todo/${_id}/edit`} ><button>Edit</button></Link>
                <button onClick={() => this.props.onDelete(_id)}>Delete</button>
            </div>
        )
    }
}

export default TodoDetails
