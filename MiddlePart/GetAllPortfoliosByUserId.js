import express from 'express';
import cors from 'cors';
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

const GetAllPortfoliosByUserID = express.Router();

const app = express()
app.use(cors());
app.use(express.json())
//let DataBase = [];

console.log('here we are...')

GetAllPortfoliosByUserID.get("/", (req, res) => {
    const q = 'select * from portfolios where user_id = ?'
    //console.log('all portfolios')
    //console.log(req.query.user_id)
    db.query(q, [req.query.user_id], (err, data) => {
        if(err) {return res.json(err)}
        return res.json(data)
    })
})

export default GetAllPortfoliosByUserID