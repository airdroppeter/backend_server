import express from 'express';

const Competitors = express.Router();

Competitors.get("/", async (req, res) => {
    //console.log('in finding competitors:');
    //console.log('getting in: ', req.query)
    //console.log('getting in bis: ', req.query.ticker)
    //console.log(req.query.pf_id)
    const q = await fetch('https://financialmodelingprep.com/api/v4/stock_peers?symbol='+req.query.ticker+'&apikey=fe07eefb7e22e24d5733a2ff74b998bb')
    const qjson = await q.json()
    //console.log(qjson)
    res.send(qjson)
})

export default Competitors