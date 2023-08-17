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

const SectorsByPfId = express.Router();

SectorsByPfId.get("/", (req, res) => {
    //const q = 'select stocks_all.ticker, stocks_all.amount from stocks_all inner join stocks_sector_industry on stocks_all.ticker = stocks_sector_industry.ticker where (stocks_sector_industry.sector= ? and stocks_all.pf_id = ?)'
    const q = 'select stocks_sector_industry.sector, stocks_all.ticker, stocks_all.amount from stocks_sector_industry inner join stocks_all on stocks_sector_industry.ticker = stocks_all.ticker where stocks_all.pf_id = ?'; 
    //console.log('all portfolios')
    console.log(req.query.pf)
    //console.log(q)
    console.log('by pf id ...')
    //db.query(q, [req.query.sector, req.query.pf_id]
    db.query(q, req.query.pf, (err, data) => {
        if(err) {return res.json(err)}
        //console.log(res.json(data))
        return res.json(data)
    })
})

export default SectorsByPfId