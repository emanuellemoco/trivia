//colocar high score
//mostrar numero de acertos
//mostrar a resposta certa quando a pessoa errar
//mostrar a categoria

//deixar a pessoa escolher a categoria

import React, {Component} from "react";
// import Footer from "./components/Footer";
//import Header from "./components/Header";
import Question from  "./components/Question";
import Highscore from  "./components/Highscore";
import axios from "axios"

import "./App.css";
//import { qualifiedTypeIdentifier } from "@babel/types";
//import { list } from "postcss"; 

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
            
            //.then(data => console.log(data))
            .then(data => { 
                this.state.quiz.push(data)
                data.results[0].incorrect_answers.map(
                    incorrect=>{lista.push(incorrect)
                        //console.log(data)
                })
                lista.push(data.results[0].correct_answer)   
                this.makeSuffle(lista)                

                this.setState({
                    loading: false,
                    listAnwser : lista,
                    quiz : data
                    
                })
                //results[i] para cada resultado
                this.setState({question:this.state.quiz.results[0].question})
                this.setState({category:this.state.quiz.results[0].category})
                console.log(this.state.quiz.results[0].correct_answer)
                this.setState({correct_answer:this.state.quiz.results[0].correct_answer})
                // this.setState({category:this.state.quiz[0].results[0].category})
                // this.setState({difficulty:this.state.quiz[0].results[0].difficulty})
                // this.setState({type:this.state.quiz[0].results[0].type})   
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
            console.log(this.state.quiz.results[0].correct_answer)
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
                    console.log("entrou boolean")
                    console.log(data)
                })
                lista.push(data.results[0].correct_answer)   
                this.makeSuffle(lista)                
                this.setState({
                    loading: false,
                    listAnwser : lista,
                    quiz : data,
                })
            })
            console.log(this.state.quiz)
            console.log(this.state.quiz.results[0].question)
            this.setState({question:this.state.quiz.results[0].question})
            this.setState({correct_answer:this.state.quiz.results[0].correct_answer})
            this.setState({category:this.state.quiz.results[0].category})
            
            console.log(this.state.quiz.results[0].correct_answer)
             
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
            console.log(this.state.quiz)
            console.log(this.state.quiz.results[0].question)
            this.setState({question:this.state.quiz.results[0].question})
            this.setState({correct_answer:this.state.quiz.results[0].correct_answer})
            this.setState({category:this.state.quiz.results[0].category})
            console.log(this.state.quiz.results[0].correct_answer)
            
            return true
    }

    clicked = (event) => {        
        if (this.checkAnswer(event.currentTarget.name)){
            this.createSetState()
        }
        //else: parte do game over
    }

    creatJsonCategory = async(event)=> {
        console.log("entrou creatJsonCategory")
        var type = event.target.value
        console.log(event.target.value) //pegando multiple quando eh pra ser truefalse

        //zerar os dados
        //zerar o id 
        this.setState({id:0})
        let b = await this.createScore()
        console.log(this.state.quiz)
        console.log(this.state.quiz.results[0].question)
        //this.setState({question:this.state.quiz.results[0].question})
        //this.setState({correct_answer:this.state.quiz.results[0].correct_answer})

        
        
        if (type === "anyType"){
           // this.createJson()
            let a = await this.createJson() 
        }
        if (type === 'multiple'){
            let a = await this.createJsonMultiple() 
            //this.createJsonMultiple()
        }
        if (type === 'boolean'){
            let a = await this.createJsonBoolean() 
            //this.createJsonBoolean()
        }    
    }

    createSetState = () => {
        //console.log("entrou no create state")
        //console.log(this.state.id +1) //pois o primeiro foi no componentdidmout
        let lista = []
        this.state.quiz.results[this.state.id+1].incorrect_answers.map( 
            incorrect=>{lista.push(incorrect)})
            
        let correct = this.state.quiz.results[this.state.id+1].correct_answer
        console.log(correct)
        lista.push(correct)

        this.makeSuffle(lista)

        this.setState({
            question:this.state.quiz.results[this.state.id+1].question,
            correct_answer:this.state.quiz.results[this.state.id+1].correct_answer,
            listAnwser: lista  
        })
    }
    checktop10 = (score) => {
        console.log("entrou top 10")
        //
        let scores = this.state.scores_score //lista com todos os scores

        let lastScore = scores[9]
        //OBS ARRUMAR AQUI PARA > **
        //NAO ESQUECER DE ARRUMAR AQUI
        if (score > lastScore){ //////////AAAAAAAAARRRUMAR AQUI
            var name = prompt("GREAT! You are in the top 10, type your name:");
            //atualizar o nome da pessoa e o score no banco de dados
            let usuarios = this.state.usuarios_score
            let lastUser = usuarios[9]

            //chama funcao updateScore para adicionar o novo score
            this.insertScore(name, score)
        }

    }

    checkAnswer = async (answer)=>{
        if (answer === this.state.correct_answer){
            let id_novo = this.state.id + 1
            this.setState({id:id_novo})
            console.log("ACERTO")
            //clicked chamao checkAnswer e se true chama createSetState
            return true
        }
        else {
            console.log("ERROU")
            alert("Wrong answer. Game over.                                                                   The correct answes was: " + this.state.correct_answer)
            //alert("The correct answes was: " + this.state.correct_answer)
            console.log("chamando o checktop10")
            this.checktop10(this.state.id) //mandando a qtd de acertos e confere se ta no top10
            

            //zerar o id 
            this.setState({id:0})
            let a = await this.createJson() 
            let b = await this.createScore()
            console.log("TESTE")
            console.log(this.state.quiz)
            console.log(this.state.quiz.results[0].question)
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
    
        //console.log("entrou no createScore")
        //this.setState({loading : true})
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
        console.log("name: " + name)
        console.log("score: " + score)
        //this.setState({loading : true})
        
        await axios.get("http://localhost:4000/insert",{
            params:{
                name,score
            }
        })
            return true
    } 

    
    
    render() {
        // const frist = "primeiro"
        // const second = "segundo"
        const date = new Date()
        const hours = date.getHours()
        let timeOfDay
        const {count} = this.state

        if (hours<12){
            timeOfDay = "morning"
        } else if (hours>=12 && hours <17){
            timeOfDay = "afternon"
        } else {
            timeOfDay = "night"
        }

        const text = this.state.loading ? "loading..." : this.state.quiz.question
        //console.log(this.state.question)
        return( 
            
            <div>
                <nav>

                {/* <h1>teste {frist + " " + second }</h1>
                <h2>oalaa {`${frist}`}</h2> */}
                
                <h3>Good {timeOfDay}!! Let's play trivia?</h3>
                {/* <Header/>
                <Footer/>*/}
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
                {/* <h6 id="textCategory"></h6> */}
                
                
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


                {/* <button disabled type="button"> {this.state.id} </button>
             */}
                {/* <h4>{JSON.stringify(this.state.quiz[0])}</h4> */}
                </main>
            </div> 
        )
    }
}

export default App