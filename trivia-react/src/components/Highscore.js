import React from "react";

function Highscore (props) {
    return(
        <div>

        <h4>HIGH SCORE:</h4>
        <table>
            <tr>
                <th><p>User</p></th>
                <th><p>Score</p></th>
            </tr>
            <tr>
            <th>
                {props.usuarios.map((usuario) => (
                <p>{usuario}</p>
                ))}
             </th>

            <th>
                {props.scores.map((score) => (
                <p>{score}</p>
                ))}
            </th>

            </tr>
        </table>
        </div>
    )
}

export default Highscore 