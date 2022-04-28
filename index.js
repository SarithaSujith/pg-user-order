const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
	user: 'iogwptou',
	host: 'tai.db.elephantsql.com',
	database: 'iogwptou',
	password: 'FTSDm8fwYNBWtSYtmFbv25jvfDM38TyH',
	port: 5432,
});
app.get('/', (req, res) => {
	pool
		.query('SELECT * FROM users ')
		.then((data) => res.json(data.rows))    
		.catch((e) => res.sendStatus(404));
});
app.listen('3000', () => {
	console.log('connected');
});
