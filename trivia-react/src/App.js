import React, {Component} from "react";

import Question from  "./components/Question";
import Highscore from  "./components/Highscore";
import axios from "axios"
import "./App.css";


class App extends Component {
    constructor() {
        super()
        this.state={
            loading: false,
            quiz: [],
            listAnwser: [],
            category: "",
            question: "",
            correct_answer: "",
            id: 0,
            difficulty: "",
            type: "" ,
            highscore: [],
            usuario: "",
            score: "",
            usuarios_score: [],
            scores_score: []
        }
    }

    componentDidMount() {
        let lista = []
        this.setState({loading : true})
        fetch("https://opentdb.com/api.php?amount=50")
            .then(response => response.json())
            .then(data => { 
                this.state.quiz.push(data)
                data.results[0].incorrect_answers.map(
                    incorrect=>{lista.push(incorrect)
                })
                lista.push(data.results[0].correct_answer)   
                this.makeSuffle(lista)                

                this.setState({
                    loading: false,
                    listAnwser : lista,
                    quiz : data
                })
                this.setState({question:this.state.quiz.results[0].question})
                this.setState({category:this.state.quiz.results[0].category})
                this.setState({correct_answer:this.state.quiz.results[0].correct_answer})  
            })
            this.createScore()      
    }
    createJson = async ()=> {
        let lista = []
        this.setState({loading : true})
        await fetch("https://opentdb.com/api.php?amount=50")
            .then(response => response.json())  
            .then(data => { 
                data.results[0].incorrect_answers.map(
                    incorrect=>{lista.push(incorrect)
                })
                lista.push(data.results[0].correct_answer)   
                this.makeSuffle(lista)                

                this.setState({
                    loading: false,
                    listAnwser : lista,
                    quiz : data,
                })
            })
            this.setState({question:this.state.quiz.results[0].question})
            this.setState({correct_answer:this.state.quiz.results[0].correct_answer})
            this.setState({category:this.state.quiz.results[0].category})
            return true
    } 
    createJsonBoolean = async ()=> {
        let lista = []
        this.setState({loading : true})
        await fetch("https://opentdb.com/api.php?amount=50&type=boolean")
            .then(response => response.json())  
            .then(data => { 
                data.results[0].incorrect_answers.map(
                    incorrect=>{lista.push(incorrect)
                })
                lista.push(data.results[0].correct_answer)   
                this.makeSuffle(lista)                
                this.setState({
                    loading: false,
                    listAnwser : lista,
                    quiz : data,
                })
            })
            this.setState({question:this.state.quiz.results[0].question})
            this.setState({correct_answer:this.state.quiz.results[0].correct_answer})
            this.setState({category:this.state.quiz.results[0].category})             
            return true
    } 
    
    createJsonMultiple = async ()=> {
        let lista = []
        this.setState({loading : true})
        await fetch("https://opentdb.com/api.php?amount=50&type=multiple")
            .then(response => response.json())  
            .then(data => { 
                data.results[0].incorrect_answers.map(
                    incorrect=>{lista.push(incorrect)
                })
                lista.push(data.results[0].correct_answer)   
                this.makeSuffle(lista)                
                this.setState({
                    loading: false,
                    listAnwser : lista,
                    quiz : data,
                })
            })
            this.setState({question:this.state.quiz.results[0].question})
            this.setState({correct_answer:this.state.quiz.results[0].correct_answer})
            this.setState({category:this.state.quiz.results[0].category})            
            return true
    }

    clicked = (event) => {        
        if (this.checkAnswer(event.currentTarget.name)){
            this.createSetState()
        }
        //else: parte do game over
    }

    creatJsonCategory = async(event)=> {
        var type = event.target.value

        //zerar os dados e o id
        this.setState({id:0})
        let b = await this.createScore()    
        
        if (type === "anyType"){
            let a = await this.createJson() 
        }
        if (type === 'multiple'){
            let a = await this.createJsonMultiple() 
        }
        if (type === 'boolean'){
            let a = await this.createJsonBoolean() 
        }    
    }

    createSetState = () => {
        let lista = []
        this.state.quiz.results[this.state.id+1].incorrect_answers.map( 
            incorrect=>{lista.push(incorrect)})
            
        let correct = this.state.quiz.results[this.state.id+1].correct_answer
        lista.push(correct)

        this.makeSuffle(lista)

        this.setState({
            question:this.state.quiz.results[this.state.id+1].question,
            correct_answer:this.state.quiz.results[this.state.id+1].correct_answer,
            listAnwser: lista  
        })
    }
    checktop10 = (score) => {
        let scores = this.state.scores_score //lista com todos os scores

        let lastScore = scores[9]
        if (score > lastScore){ 
            var name = prompt("GREAT! You are in the top 10, type your name:");
            //atualizar o nome da pessoa e o score no banco de dados
            let usuarios = this.state.usuarios_score
            let lastUser = usuarios[9]

            //chama funcao insertScore para adicionar o novo score
            this.insertScore(name, score)
        }
    }

    checkAnswer = async (answer)=>{
        if (answer === this.state.correct_answer){
            let id_novo = this.state.id + 1
            this.setState({id:id_novo})
            return true
        }
        else {
            alert("Wrong answer. Game over.                                                                   The correct answes was: " + this.state.correct_answer)
            this.checktop10(this.state.id) //mandando a qtd de acertos e confere se ta no top10
            
            //zerar o id 
            this.setState({id:0})
            let a = await this.createJson() 
            let b = await this.createScore()
            this.setState({question:this.state.quiz.results[0].question})
            this.setState({correct_answer:this.state.quiz.results[0].correct_answer}) 
            return false 
        }
    }

    handleSubmit(event){
        event.preventDefault();

    }

    makeSuffle(lista){
        for (var i = lista.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = lista[i];
            lista[i] = lista[j];
            lista[j] = temp;
        }
    }

    createScore = async ()=> {
        let listaUsuarios = []
        let listaScores = []

        await fetch("http://localhost:4000/highscore")
            .then(response => response.json())  
            .then(data => { 
                this.setState({
                    highscore : data,
                    usuarios_score : listaUsuarios,
                    scores_score : listaScores
                })

                for (var i=0; i<10; i++){
                    listaUsuarios.push(this.state.highscore.data[i].usuario)
                    listaScores.push(this.state.highscore.data[i].score)
                }
            })
            return true
    }  
    
    insertScore = async (name, score)=> {
        await axios.get("http://localhost:4000/insert",{
            params:{
                name,score
            }
        })
            return true
    } 
    
    render() {
        const date = new Date()
        const hours = date.getHours()
        let timeOfDay

        if (hours<12){
            timeOfDay = "morning"
        } else if (hours>=12 && hours <17){
            timeOfDay = "afternon"
        } else {
            timeOfDay = "night"
        }

        // current day
        // adjust 0 before single digit date
        let day = ("0" + date.getDate()).slice(-2);
        // current month
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        // current year
        let year = date.getFullYear();

        let fullDate = year + "-" + month  + "-" + day

        const text = this.state.loading ? "loading..." : this.state.quiz.question
        
        return( 
            <div>
                <nav>                
                <h3>Good {timeOfDay}!! Let's play trivia? &emsp;&emsp;&emsp;&emsp;&emsp; {fullDate} </h3>
                </nav>
                <main>
                
                <h6>Choose the type: </h6>
                <form>
                <select name="option" onChange={this.creatJsonCategory}>
                    <option value="anyType">Any category</option>
                    <option value="multiple">Multiple Choiche</option> 
                    <option value="boolean">True / False</option>
                </select>
                </form>               
                
                <Question question={this.state.question} id={this.state.id} category={this.state.category}/>
                <p>{text}</p>

                <button onClick={this.clicked} type="submit" name={this.state.listAnwser[0]} style={{display: !this.state.listAnwser[0] && "none"}}>{this.state.listAnwser[0]}</button>
                <button onClick={this.clicked} type="submit" name={this.state.listAnwser[1]}  style={{display: !this.state.listAnwser[1] && "none"}}>{this.state.listAnwser[1]}</button>
                <br/><br/>
                <button onClick={this.clicked} type="submit" name={this.state.listAnwser[2]}  style={{display: !this.state.listAnwser[2] && "none"}}>{this.state.listAnwser[2]}</button>
                <button onClick={this.clicked} type="submit" name={this.state.listAnwser[3]}  style={{display: !this.state.listAnwser[3] && "none"}}>{this.state.listAnwser[3]}</button>
                               
                <br></br><br></br> 

                <h5>Quantidade de acertos: {this.state.id} </h5>
                <hr/>  
                
                <Highscore usuarios={this.state.usuarios_score} scores={this.state.scores_score}/>
                </main>
            </div> 
        )
    }
}

export default App