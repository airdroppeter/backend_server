import express from 'express';

//import { OAuth2Client } from 'google-auth-library';
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'IloveBali01!',
    database: 'stock_portfolio'

});

const AddTicker = express.Router();

AddTicker.post("/", (req, res) => {
    let today = new Date();
    let today2 = today.toLocaleDateString('en-CA');
    console.log('today is: ', today);
    console.log('today2 is: ', today2);
    //const q = 'select stocks_all.ticker, stocks_all.amount from stocks_all inner join stocks_sector_industry on stocks_all.ticker = stocks_sector_industry.ticker where (stocks_sector_industry.sector= ? and stocks_all.pf_id = ?)'
    const q = "insert into stocks_all (pf_id, ticker, amount, buy_price, currency, date, user_id) values (?, ?, ?, ?, 'USD', ?, ?)"; 
    console.log('in add ticker to portfolio')
    console.log(req.query)
    //db.query(q, [req.query.user_id, req.query.name])
    console.log([req.query.pfId, req.query.ticker, req.query.buyPrice, req.query.userId])
    //db.query(q, [req.query.sector, req.query.pf_id]
    db.query(q, [req.query.pfId, req.query.ticker,req.query.amount, req.query.buyPrice, today2, req.query.userId], (err, data) => {
        if(err) {return res.json(err)}
        //console.log(res.json(data))
        return res.json(data)
    })
})

export default AddTicker