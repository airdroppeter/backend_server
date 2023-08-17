import express from 'express';

//import { OAuth2Client } from 'google-auth-library';
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'IloveBali01!',
    database: 'stock_portfolio'

});

const FindNameByTicker = express.Router();

FindNameByTicker.get("/", (req, res) => {
    //console.log('in search name');
    //console.log('ticker is: ', req.query.ticker)
    //console.log(req.body.ticker);
    const q = 'select ticker, name from ticker_name where ticker = ?'
    //console.log('all portfolios')
    //console.log(req.query.ticker)
    //console.log(q)
    db.query(q, req.query.ticker, (err, data) => {
        if(err) {return res.json(err)}
        //console.log(res.json(data))
        return res.json(data)
    })
})

export default FindNameByTicker