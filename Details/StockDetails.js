import express from 'express';

const StockDetails = express.Router();

StockDetails.get("/", async (req, res) => {
    console.log('in stock details:');
    //console.log('getting in: ', req.query)
    console.log('getting in details: ', req.query.ticker)
    //console.log(req.query.pf_id)
    const q = await fetch('https://financialmodelingprep.com/api/v3/profile/' + req.query.ticker + '?apikey=fe07eefb7e22e24d5733a2ff74b998bb')
    //console.log('query = ', q);
    const qjson = await q.json()
    //console.log(qjson)
    res.send(qjson)
})

export default StockDetails