import express from 'express';

//import { OAuth2Client } from 'google-auth-library';
import mysql from 'mysql2';

import dotenv from 'dotenv';

dotenv.config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_2

});

const DividendPricePercentage = express.Router();
 
DividendPricePercentage.get("/", (req, res) => {
    //const q = 'select stocks_all.ticker, stocks_all.amount from stocks_all inner join stocks_sector_industry on stocks_all.ticker = stocks_sector_industry.ticker where (stocks_sector_industry.sector= ? and stocks_all.pf_id = ?)'
    const q = 'select date, percentage from dividend_price_percentage_'+req.query.ticker[0]+' where ticker = ? order by date asc'; 
    //console.log('all portfolios')
    //console.log('---------------')
    //console.log(req.query.ticker)
    //console.log(req.query.ticker[0])
    //console.log(q)
    
    //db.query(q, [req.query.sector, req.query.pf_id]
    db.query(q, req.query.ticker, (err, data) => {
        if(err) {return res.json(err)}
        //console.log(res.json(data))
        return res.json(data)
    })
})

export default DividendPricePercentage