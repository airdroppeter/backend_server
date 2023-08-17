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
 
const GetAmountStocksAndPrices = express.Router();
//con sole.log('here also an entry')
GetAmountStocksAndPrices.get("/", (req, res) => {
    const q = 'select stocks_all.ticker, stocks_all.pf_id, stocks_all.buy_price, stocks_all.amount, recent_prices.price, recent_prices.frequency, recent_prices.payout, recent_prices.next_div from stocks_all inner join recent_prices on stocks_all.ticker=recent_prices.ticker where stocks_all.user_id= ?'
    //console.log('all portfolios')
    //console.log(req.query.user_id)
    //console.log(q)
    db.query(q, req.query.user_id, (err, data) => {
        if(err) {return res.json(err)}
        //console.log(res.json(data))
        return res.json(data)
    })
})

export default GetAmountStocksAndPrices