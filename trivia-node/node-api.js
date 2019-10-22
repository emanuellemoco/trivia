const express = require('express');


const mysql = require('mysql')

const app = express();

const selectALL = 'SELECT * FROM Score order by score DESC';

//const updateScore = 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'trivia'
});

connection.connect(err => {
    if(err){
        return err;
    }
});


app.get('/', (req, res) => {
	res.send('highscore is in /highscore')
})

app.get('/highscore', (req, res) => {
	connection.query(selectALL, (err, results) => {
		if(err){
        return res.send(err);
    	}
    	else {
    		return res.json({
    			data: results
    		})
    	}
	});
});


app.get('/insert', function(req, res){
	const {name, score} = req.query
	if(!name && !score){
		return res.status(400).send()
	}
	connection.query(`INSERT INTO Score SET ?`, ({usuario:name, score}), function(error, results, fields){
		if (error) return console.log(error);
		console.log('adionado');
	});
	return res.send();
})


app.listen(4000, () => {
	console.log("porta 4000")
})

