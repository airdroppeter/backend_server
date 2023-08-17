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

const GetDailyValueByPfId = express.Router();

GetDailyValueByPfId.get("/", (req, res) => {
    const q = 'select date, value from daily_value where pf_id = ?'
    //console.log('all portfolios')
    //console.log(req.query.ticker)
    //console.log(q)
    db.query(q, req.query.pf_id, (err, data) => {
        if(err) {return res.json(err)}
        //console.log(res.json(data))
        return res.json(data)
    })
})

export default GetDailyValueByPfId