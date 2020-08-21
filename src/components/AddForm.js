import React from 'react'

export default function AddForm(props) {

    console.log(props)

    return (
        <form onSubmit={props.onSubmit}>
            <input name="name" type="text" placeholder="Enter Name"></input>
            <input name="description" type="text" placeholder="Enter Description"></input>
            <button type="submit">Create</button>
        </form>
    )
}
