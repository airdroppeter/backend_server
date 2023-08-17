import express from 'express';

//import { OAuth2Client } from 'google-auth-library';
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'IloveBali01!',
    database: 'stock_portfolio'

});
 
const KingsAristocrats = express.Router();

KingsAristocrats.get("/", (req, res) => {
    const q = 'select * from special_tickers where kind = ?'
    //console.log('all portfolios')
    console.log(req.query.kind)
    //console.log(q)
    db.query(q, req.query.kind, (err, data) => {
        if(err) {return res.json(err)}
        //console.log(res.json(data))
        return res.json(data)
    })
})

export default KingsAristocrats