import express from 'express';
//import cors from 'cors';
//import { OAuth2Client } from 'google-auth-library';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import verifyGoogleToken from './verifyGoogleToken.js';
import dotenv from 'dotenv';

dotenv.config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE

});

const Signup = express.Router();

const app = express()
//app.use(cors());
app.use(express.json())
//let DataBase = [];



Signup.post('/', async(req, res) => {
    console.log('in registering on server');
    //console.log('req.body.credential: ',req.body.credential);
    try{
        if (req.body.credential){
            //console.log('in if na try')
            const verificationResponse = await verifyGoogleToken(req.body.credential);
            //console.log('ver response: ',verificationResponse);
             if (verificationResponse.error){
                console.log(' er is een error:', verificationResponse.error)
                return res.status(400).json({
                    message: verificationResponse.error
                });
            }
            const profile = verificationResponse?.payload;
            //console.log('Profile: ', profile)
            //DataBase.push(profile);
            console.log('------------');
            
            let re;
            const email = profile?.email;
	    console.log('email: ', email);
            db.query("select email from users1 where email = '"+email+"'", (error, data) => {
                if (data.length) {
                    console.log('user already exist') 
                    re = false
                    res.status(500).json({
                        message: 'user alreay exists'
                    })}
                if (!data.length) {
                    console.log('user does not exist -> creating user: ');
                    const now = new Date();
                    const datum = now.toISOString().slice(0,10)
                    console.log('date of creation: ', datum)
                    const q = "insert into users1 (email, last_login, account_created) value ('"+profile?.email+"', '"+datum+"','"+datum+"')"
                    //console.log(q);
                    db.query(q,  (err, data) => {
                        if(err) {console.log(err)}
                        //console.log(data)
                    //    return res.json(data)
                    })
		
		   const q2 = "select id from users1 where email = '"+profile?.email+"'";
                   db.query(q2,  (err, data2) => {
                        if(err) {console.log(err)}
                        //console.log('result from q2: ',data2)
			//console.log('id = ', data2[0]['id']);
                       //return res.json(data2[0]['id'])
                    

                    re = true;
		    console.log('na query ... id: ');
                    res.status(201).json({
                        user: {
                            firstName: profile?.given_name,
                            lastName: profile?.family_name,
                            picture: profile?.picture,
                            email: profile?.email,
			    user_id: data2[0]['id'],
                            token: jwt.sign({email: profile?.email}, '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', {
                                expiresIn: '1d',
                            })
                        }
                    })
                })
            }
            return re}
            )
            

            console.log('X: ', re)
            //const yesorno = existornot()
            //console.log('exist in db: ', yesorno)
            

            
        }

    } catch (error){
        res.status(500).json({
            message: 'an error occurred, registration failed'
        })
    }
})

export default Signup