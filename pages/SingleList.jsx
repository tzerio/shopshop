import React from "react"

export default function SingleList(props) {
        const index = props.index
        const name = props.cat.name
        const list = props.cat.content
        const deleteFunction = props.deleteItem
            return (
        <li key={index} >
            <span onClick={props.remoteSelect}>{name}</span>
            <ul>
                {list.map((item, id) => <li onDoubleClick={() => deleteFunction(id)} key={id}>{item}</li>)}
            </ul>
        </li>
        )
}