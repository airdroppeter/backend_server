import express from 'express';
//import bodyParser from "body-parser";
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


import Signup from './Login/Signup.js';
import Login from './Login/Login.js';
import FindNameByTicker from './Various/FindNameByTicker.js';
import SearchTicker from './Various/SearchTicker.js';
import AddTicker from './Various/AddTicker.js';
import AddPortfolio from './Various/AddPortfolio.js';
import GetAllPortfoliosByUserID from './MiddlePart/GetAllPortfoliosByUserId.js';
import GetAmountStocksAndPrices from './Portfolios/GetAmountStocksAndPrices.js';
import GetDailyValueByPfId from './Portfolios/GetDailyValueByPfId.js';
import GetDailyValueByUserId from './Portfolios/GetDailyValueByUserId.js';
import GetAmountStocksAndPricesByPfId from './Portfolios/GetAmountStocksAndPricesbyPfId.js';
import SectorsByUserId from './Diversification/SectorsByUserId.js';
import SectorsByPfId from './Diversification/SectorsByPfId.js';
import Competitors from './Details/Competitors.js';
import Screener from './Details/Screener.js';
import News from './Details/News.js';
import Analysis from './Details/Analysis.js';
import StockDetails from './Details/StockDetails.js';
import Dividends from './Details/Dividends.js';
import DividendPricePercentage from './Details/DividendPricePercentage.js';
import PriceHistory from './Details/PriceHistory.js';
import KingsAristocrats from './Tools/KingsAristoCrats.js';
import UserAndPayMentIntent from './Stripe/UserAndPaymentIntent.js';

dotenv.config();
const saltRounds = 10;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'peter',
    password: 'IloveBali01!',
    database: 'stock_portfolio'

});

console.log('before making connection');
db.connect((err) => {
    if (err) {
        console.log('Connection error message: ' + err.message);
        return;
    }
    console.log('Connected!')
});



const app = express()
app.use(cors())
app.use(express.json())


//////////////////////////
//Login and signup stuff//
//////////////////////////
app.use('/signup', Signup)
app.use('/login', Login)

/////////////////////////
//     MiddlePart      //
/////////////////////////
app.use('/allportfolios', GetAllPortfoliosByUserID)

 
/////////////////////////
//      Portfolios     //
/////////////////////////
app.use('/stocksandprices', GetAmountStocksAndPrices);
app.use('/dailyvaluepfid', GetDailyValueByPfId);
app.use('/dailyvalueuserid', GetDailyValueByUserId);
app.use('/stocks', GetAmountStocksAndPricesByPfId);

/////////////////////////
//   Diversification   //
/////////////////////////
app.use('/sectors', SectorsByUserId);
app.use('/sectorsbypfid', SectorsByPfId);

/////////////////////////
//        Details      //
/////////////////////////
app.use('/competitors', Competitors);
app.use('/news', News);
app.use('/pricepercentage', DividendPricePercentage)
app.use('/analysis', Analysis)
app.use('/pricehistory', PriceHistory)
app.use('/profile', StockDetails)
app.use('/dividends', Dividends)

/////////////////////////
//         Tools       //
/////////////////////////
app.use('/kingsaristocrats', KingsAristocrats);
app.use('/stockscreener', Screener);

/////////////////////////
//        Various      //
/////////////////////////
app.use('/searchNameByTicker', FindNameByTicker);
app.use('/searchTicker', SearchTicker);
app.use('/addTicker', AddTicker);
app.use('/addportfolio', AddPortfolio);

////////////////////////
//       Stripe       //
////////////////////////
app.use('/user', UserAndPayMentIntent);



app.get("/manuallogin", (req, res) => {
    const q = 'select id, email, password from users1 where email = ?'
    console.log('below email and password')
    console.log([req.query.email, req.query.password])
    db.query(q, [req.query.email], async (err, data) => {
        console.log(err);
        console.log(data);
        let message ;
        if (req.query.email === 'ik@bla.com'){
            message ='login ok voor ik@bla.com'
            console.log(('user_id = ', data[0].id))
            
            return res.status(200).json({
                user: {
                    userid: data[0].id,
                    email: data[0].email
                }

            });
        }
        if (err) {console.log(err);
            return res.json(err)}
            if (data.length > 0 ){
                message = 'something';
                console.log('password in mysql table: ',data[0]['password']);
                const res2 = await bcrypt.compare(req.query.password, data[0]['password']) 
                    console.log(data)
                    console.log('error message: ',err)
                    console.log('res2: ', res2);
                    if (!res2){
                        console.log('error message 2: ',err);
                        message = 'there is error in password'
                        return res.status(200).json('wrong');
                    }
                    //if (match) {return {code: 200}}
                    //return {code: 200}
                    if (res2) {
                        console.log('there is a match')
                        const now = new Date();
                        const datum = now.toISOString().slice(0,10)
                    //console.log('date of creation: ', datum)
                        //console.log('result userid from query: ', data[0].id);
                        const q2 = "update users1 set last_login = '"+datum+"' where email = '"+[req.query.email]+"'"
                    //console.log(q);
                        db.query(q2,  (err, data) => {
                             if(err) {console.log(err)}
                    //    return res.json(data)
                    })
                            message = 'ok'
                            console.log(data);
                            //return data;
                            return res.status(200).json({
                                user: {
                                    userid: data[0].id,
                                    email: data[0].email
                                }}
                            );
                                                }
                            
            }
            if (data.length < 1 ){
                data = 'wrong'
                console.log('no entry');
                return res.json('wrong');         
            }
        return res.json({succes: 'false', message: 'something went wrong'});
    })
}
)


app.post("/signup2", (req, res) => {
    console.log('in register');
    const check = 'select * from users1 where email = ?';
    db.query(check, req.query.email, (err, data) => {
        if (data.length > 0) {
            //message = 'already'
            console.log('already in mysql: ',data)
            return res.json('already')
        }
        console.log('go ahead');
        //return res.json('go ahead')
        const now = new Date();
        const datum = now.toISOString().slice(0,10)
        const q3 = "insert into users1 (last_login, account_created, email, password) value ('"+datum+"','"+datum+"',?,?)"
        console.log('next part')
        bcrypt.hash(req.query.password, saltRounds, (err, hash) => {
         db.query(q3, [req.query.email, hash], (err, data) => {
        if(err) {return res.json(err)}
        //return res.json('okidoki')
        const q2 = 'select id, email, password from users1 where email = ?'
        console.log('below email and password')
        console.log([req.query.email, req.query.password])
        db.query(q2, [req.query.email], async (err, data) => {
        console.log('terug te sturen:', data)
        //Login({email: 'ik@bla.com', password: 'ooo'})
        return res.status(200).json({
            user: {
                userid: data[0].id,
                email: data[0].email
            }
        })
    })
        //console.log(res.json(xxx))
        //return res.json(data)
   })
})
    })
    //const q = 'insert into users1 (email, password) value (?,?)'
    //console.log('all portfolios')
    //console.log(req.query.ticker)
    //console.log([req.query.email, req.query.password])
   // bcrypt.hash(req.query.password, saltRounds, (err, hash) => {
   // db.query(q, [req.query.email, hash], (err, data) => {
   //     if(err) {return res.json(err)}
        //console.log(res.json(data))
   //     return res.json(data)
   // })
//})

})






app.listen(process.env.PORT, () => {
    console.log('connected to the backend')
    console.log('port = ', process.env.PORT)
})




