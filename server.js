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
	connection.query(sql, [values], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		res.send({ express: results });
	});
	connection.end();
});

app.post('/api/addSearch', (req, res) => {
	var searchBox = req.body.data;
	var sql = "SELECT M.name, CONCAT(D.first_name, ' ', D.last_name) AS Director_Name, AVG(R.reviewScore) AS averageScore FROM a7bhanji.movies M INNER JOIN a7bhanji.movies_directors AS MD ON MD.movie_id = M.id INNER JOIN a7bhanji.directors AS D ON D.id = MD.director_id LEFT JOIN a7bhanji.Review AS R on M.id = R.movieID INNER JOIN a7bhanji.roles AS Roles ON Roles.movie_id = MD.movie_id LEFT JOIN a7bhanji.actors AS A ON A.id = Roles.actor_id WHERE"
	var extraSQL = ''
	if (searchBox.movieTitle) {
		if (extraSQL){
			extraSQL = " AND M.name = '" + searchBox.movieTitle + "'";
		} else{
			extraSQL = " M.name = '" + searchBox.movieTitle + "'";
		}
	}
	if (searchBox.actorName) {
		console.log("in here")
		if (extraSQL){
			extraSQL = extraSQL + " AND concat(A.first_name, ' ', A.last_name) = '" + searchBox.actorName + "'";
		} else{
			extraSQL = extraSQL + " concat(A.first_name, ' ', A.last_name) = '" + searchBox.actorName + "'";
		}
	}
	if (searchBox.directorName) {
		if (extraSQL){
			extraSQL = extraSQL+ " AND concat(D.first_name, ' ', D.last_name) = '" + searchBox.directorName + "'";
		} else{
			extraSQL = extraSQL+ " concat(D.first_name, ' ', D.last_name) = '" + searchBox.directorName + "'";
		}
	}
	sql = sql + extraSQL + " GROUP BY M.name, Director_Name";
	console.log(sql)
	let connection = mysql.createConnection(config);
	connection.query(sql, function (err, result, fields) {
		if (err) throw err;
		let string = JSON.stringify(result);
		console.log(string)
		res.send({ result: string });
	});
	connection.end();
});

app.post('/api/addSearchContent', (req, res) => {
	var searchBox = req.body.data;
	var sql = "SELECT DISTINCT M.name, R.reviewContent FROM a7bhanji.movies M INNER JOIN a7bhanji.Review R ON R.movieID = M.id INNER JOIN a7bhanji.movies_directors AS MD ON MD.movie_id = M.id INNER JOIN a7bhanji.directors AS D ON D.id = MD.director_id INNER JOIN a7bhanji.roles AS Roles ON Roles.movie_id = MD.movie_id INNER JOIN a7bhanji.actors AS A ON A.id = Roles.actor_id WHERE"
	var extraSQL = ''
	if (searchBox.movieTitle) {
		if (extraSQL){
			extraSQL = " AND M.name = '" + searchBox.movieTitle + "'";
		} else{
			extraSQL = " M.name = '" + searchBox.movieTitle + "'";
		}
	}
	if (searchBox.actorName) {
		console.log("in here")
		if (extraSQL){
			extraSQL = extraSQL + " AND concat(A.first_name, ' ', A.last_name) = '" + searchBox.actorName + "'";
		} else{
			extraSQL = extraSQL + " concat(A.first_name, ' ', A.last_name) = '" + searchBox.actorName + "'";
		}
	}
	if (searchBox.directorName) {
		if (extraSQL){
			extraSQL = extraSQL+ " AND concat(D.first_name, ' ', D.last_name) = '" + searchBox.directorName + "'";
		} else{
			extraSQL = extraSQL+ " concat(D.first_name, ' ', D.last_name) = '" + searchBox.directorName + "'";
		}
	}
	sql = sql + extraSQL;
	console.log(sql)
	let connection = mysql.createConnection(config);
	connection.query(sql, function (err, result, fields) {
		if (err) throw err;
		let string = JSON.stringify(result);
		console.log(string)
		res.send({ result: string });
	});
	connection.end();
});

app.post('/api/topMoviesList', (req, res) => {
	var searchBox = req.body.data;
	var sql = "SELECT AVG(R.reviewScore) AS avgScore, M.name, M.trailer_link FROM a7bhanji.Review R, a7bhanji.movies M WHERE M.id = R.movieID GROUP BY M.id ORDER BY avgScore desc LIMIT 4"
	console.log(sql)
	let connection = mysql.createConnection(config);
	connection.query(sql, function (err, result, fields) {
		if (err) throw err;
		let string = JSON.stringify(result);
		console.log(string)
		res.send({ result: string });
	});
	connection.end();
});
//app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
