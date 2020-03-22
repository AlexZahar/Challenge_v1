import React from 'react'
import './Candidate.css'

const candidate = props => (
    <div className="candidate" onClick={props.clicked}>
   <h1>{props.name}</h1>
    <h4>{props.id}</h4>
</div>
)

export default candidate