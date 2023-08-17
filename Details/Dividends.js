import express from 'express';

const Dividends = express.Router();

Dividends.get("/", async (req, res) => {
    console.log('in getting dividends:');
    //console.log('getting in: ', req.query)
    //console.log('getting in bis: ', req.query.ticker)
    //console.log(req.query.pf_id)
    const q = await fetch('https://financialmodelingprep.com/api/v3//historical-price-full/stock_dividend/' + req.query.ticker + '?apikey=fe07eefb7e22e24d5733a2ff74b998bb')
    //console.log('query = ', q);
    const qjson = await q.json()
    //console.log(qjson)
    res.send(qjson)
})

export default Dividends