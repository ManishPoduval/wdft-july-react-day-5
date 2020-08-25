import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'
import {Link} from 'react-router-dom'
// import MyMap from './MyMap'
// import ChatBot from './ChatBot'
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
//import "../App.css"; //change this link to ..
import {Redirect} from 'react-router-dom'


class TodoDetails extends Component {

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

    render() {

        // const promise = loadStripe("pk_test_51HJ0c0BfOEj3QZ8feuSBtbYIRg1Jz8vYESZmvp1SweikDC6I0M4OkpHmZjwj2A7qXVayZr5fS07Sz9mBZZb1O0fA00GrlcvlMN");
        if(!this.props.loggedInUser){
            return <Redirect to="/sign-in" />
        }


        if (!this.state.todo){
            return <p>Loading ....</p>
        }
  
        const {name, description, _id, image} = this.state.todo

        return (
            <div>
                <p>{name}</p>
                {/* <MyMap /> */}
                {/* <ChatBot /> */}
                {/* <Elements stripe={promise}>
                    <CheckoutForm />
                </Elements> */}
                <p>{description}</p>
            {image && <img style={{width: '200px', height: '200px'}} src={image} alt={name}/> }
                <Link to={`/todo/${_id}/edit`} ><button>Edit</button></Link>
                <button onClick={() => this.props.onDelete(_id)}>Delete</button>
                
            </div>
        )
    }
}

export default TodoDetails
