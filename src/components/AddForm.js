import React from 'react'

export default function AddForm(props) {

    return (
        <form onSubmit={props.onSubmit}>
            <input name="name" type="text" placeholder="Enter Name"></input>
            <input name="description" type="text" placeholder="Enter Description"></input>
           {/*<div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" className="form-control" name="image" id="image" />
            </div> */}
            <button type="submit">Create</button>
        </form>
    )
}
