let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const { strictEqual } = require('assert');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/getMovies', (req, res) => {
	
	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM movies`;
	console.log(sql);
	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addReview', (req, res) => {
	var review = req.body;
	
	let connection = mysql.createConnection(config);
	let sql = 'INSERT INTO Review (movieID, userID, reviewTitle, reviewContent, reviewScore) VALUES ?';
	var values = [Object.values(review.data)];
	console.log(values);
	connection.query(sql,[values],(error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		res.send({ express: results });
	});
	connection.end();
});





app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
