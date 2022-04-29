const express = require('express');
const app = express();
// const dotenv = require('dotenv');
// dotenv.config();
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
	// user: 'iogwptou',
	// host: 'tai.db.elephantsql.com',
	// database: 'iogwptou',
	// password: 'FTSDm8fwYNBWtSYtmFbv25jvfDM38TyH',
	// port: 5432,
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_Database,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
});
//read all the users

app.get('/', (req, res) => {
	pool
		.query('SELECT * FROM users ')
		.then((data) => res.json(data.rows))
		.catch((e) => res.sendStatus(404));
});
//read a sprecific user with particular id

app.get('/:id', (req, res) => {
	const {id} = req.params
	pool
		.query('SELECT * FROM users WHERE id=$1;', [id])
		.then((data) => res.json(data.rows))
		.catch((e) => res.sendStatus(404));
});
//to create an element

app.post('/',(req, res)=>{
	const {name} = req.body;

	pool
	.query('INSERT INTO users(name) values ($1) RETURNING *;', [name]) //we inject the name in the request
	.then(data=>res.status(201).json(data))
	.catch(e=>res.sendStatus(404))
})

app.listen('3000', () => {
	console.log('connected');
});
