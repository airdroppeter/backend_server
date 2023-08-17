import express from 'express';

//import { OAuth2Client } from 'google-auth-library';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE

});

const AddPortfolio = express.Router();

AddPortfolio.post("/", (req, res) => {
    //const q = 'select stocks_all.ticker, stocks_all.amount from stocks_all inner join stocks_sector_industry on stocks_all.ticker = stocks_sector_industry.ticker where (stocks_sector_industry.sector= ? and stocks_all.pf_id = ?)'
    const q = 'insert into portfolios (user_id, name) values (?, ?)'; 
    console.log('in add portfolio')
    console.log(req.query)
    //db.query(q, [req.query.user_id, req.query.name])
    console.log([req.query.userId, req.query.name])
    //db.query(q, [req.query.sector, req.query.pf_id]
    db.query(q, [req.query.userId, req.query.name], (err, data) => {
        if(err) {return res.json(err)}
        //console.log(res.json(data))
        return res.json(data)
    })
})

export default AddPortfolio;