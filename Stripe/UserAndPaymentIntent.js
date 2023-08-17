import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = 'sk_test_51LONzUEmOCxfDzgdXRfgdweVXK9sAZ7C3GSoTLkLPMDRuNKHhbY0ELMRzIXFEkXMwai3WAMd6IawXyJTsLsgce3b00QqvJlEEX';
const stripe = new Stripe(API_KEY);

const app = express()
app.use(cors())
app.use(express.json())
const UserAndPayMentIntent = express.Router();

UserAndPayMentIntent.post("/", (req, res) => {
    console.log('in user and payment intent');
    createuser(req.body, res);
})

async function createuser(data,res) {
    //console.log(data);
   //1. Create customer
   const customer =  await stripe.customers.create({
       email: data.email,
       name: data.name,
   });
   console.log('1. Customer created');
   //console.log(customer);
   //2. create subscription
   try {
       const subscription = await stripe.subscriptions.create({
           customer: customer.id,
           items: [{price: data.priceId}],
           payment_behavior: 'default_incomplete',
           payment_settings: {
               save_default_payment_method: 'on_subscription'
           },
           expand: ['latest_invoice.payment_intent']
       });

       res.send({
           subscriptionId: subscription.id,
           clientSecret: subscription.latest_invoice.payment_intent.client_secret,
       });
       console.log('clientSecret: ',subscription.latest_invoice.payment_intent.client_secret);
       console.log('subscriptionId: ', subscription.id);
       
   } catch (error) {
       return res.status(400).send({error: {message: error.message}})
   }
   

};


export default UserAndPayMentIntent