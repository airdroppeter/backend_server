import express from 'express';

//import { OAuth2Client } from 'google-auth-library';
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'IloveBali01!',
    database: 'stock_portfolio'

});

const DeleteTicker = express.Router();

DeleteTicker.post("/", (req, res) => {
    
    //const q = 'select stocks_all.ticker, stocks_all.amount from stocks_all inner join stocks_sector_industry on stocks_all.ticker = stocks_sector_industry.ticker where (stocks_sector_industry.sector= ? and stocks_all.pf_id = ?)'
    const q = "delete from stocks_all where ticker = ? and pf_id=?"; 
    console.log('in add ticker to portfolio')
    //console.log(req.query)
    //db.query(q, [req.query.user_id, req.query.name])
    console.log([req.query.ticker,  req.query.pfId])
    //db.query(q, [req.query.sector, req.query.pf_id]
    db.query(q, [req.query.ticker, req.query.pfId], (err, data) => {
        if(err) {return res.json(err)}
        //console.log(res.json(data))
        return res.json(data)
    })
})

export default DeleteTicker