import React from "react";
import "../App.css";

function Question(props) {    
    if (props.question === undefined) {
        return (
            <div></div>
        )
    }
       return(
        <div>
            <h5>Question number {props.id+1}:</h5>
            <p>Category: {props.category}</p>
            <p> {props.question}</p>   
        </div>   
    )
}

export default Question 