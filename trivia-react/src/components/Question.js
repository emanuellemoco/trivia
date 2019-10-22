import React from "react";
import "../App.css";

function Question(props) {
    //console.log(props.question)
    // console.log(props.quiz[0].results[0])
    
    if (props.question === undefined) {
        //console.log("entrou aqui")
        return (
            <div></div>
        )
    }
   
    //question:this.state.quiz[0].results[0].question}
    return(
        <div>
            <h5>Question number {props.id+1}:</h5>
            <p>Category: {props.category}</p>
            {/* <p > {props.quiz[0].results[0]}</p> */}
            <p> {props.question}</p>

            
        </div>   
    )
}

export default Question 