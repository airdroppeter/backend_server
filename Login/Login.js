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


const Login = express.Router();

Login.post('/', async(req, res) => {
    console.log('in sign up on server');
    console.log('req.body.credential: ',req.body.credential);
    try{
        if (req.body.credential){
            //console.log('in if na try')
            const verificationResponse = await verifyGoogleToken(req.body.credential);
            //console.log('ver response: ',verificationResponse);
             if (verificationResponse.error){
                //console.log(' er is een error:', verificationResponse.error)
                return res.status(400).json({
                    message: verificationResponse.error
                });
            }
            const profile = verificationResponse?.payload;
            profile.test = 'test';
            console.log('Profile: ', profile)
            //DataBase.push(profile);
            //console.log('db: ',DataBase)
            console.log('------------');
            //let existornot ='';
            //console.log('profile at the end: ',profile)
            const email = profile?.email;
            let re;
            db.query("select email, id from users1 where email = '"+email+"'", (error, data) => {
                if (!data.length) {
                    console.log('user does not exist') 
                    //re = false
                    res.status(500).json({
                        message: 'user does not exist yet, please register first'
                    })}
                if (data.length) {
                    console.log('user does exist -> returning details + update last login: ');
                    const now = new Date();
                    const datum = now.toISOString().slice(0,10)
                    //console.log('date of creation: ', datum)
                    console.log('result userid from query: ', data[0].id);
                    const q = "update users1 set last_login = '"+datum+"' where email = '"+email+"'"
                    //console.log(q);
                    db.query(q,  (err, data) => {
                        if(err) {console.log(err)}
                    //    return res.json(data)
                    })
                    //re = true;
                    res.status(201).json({
                        user: {
                            firstName: profile?.given_name,
                            lastName: profile?.family_name,
                            picture: profile?.picture,
                            email: profile?.email,
                            userid: data[0].id,
                            token: jwt.sign({email: profile?.email}, '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', {
                                expiresIn: '1d',
                            })
                        }
                    })
            }
            return re}
            )

            
        }

    } catch (error){
        res.status(500).json({
            message: 'an error occurred, registration failed'
        })
    }
})

export default Login