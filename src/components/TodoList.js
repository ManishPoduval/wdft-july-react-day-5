import React from 'react'
import {Link} from 'react-router-dom'

export default function TodoList(props) {
    return (
        <div>
            {
                props.todos.map((todo, i) => {
                    return <Link key={i} to={`/todo/${todo._id}`} ><p>{todo.name}</p></Link>
                })
            }
        </div>
    )
}
