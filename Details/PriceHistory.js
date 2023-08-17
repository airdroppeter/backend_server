import express from 'express';

const PriceHistory = express.Router();

PriceHistory.get("/", async (req, res) => {
    //console.log('in pricehistory:');
    //console.log('getting in: ', req.query)
    //console.log('getting in bis: ', req.query.ticker)
    //console.log(req.query.pf_id)
    const q = await fetch('https://financialmodelingprep.com/api/v3/historical-price-full/' + req.query.ticker+'?from='+req.query.from+'&to='+req.query.to + '&apikey=fe07eefb7e22e24d5733a2ff74b998bb')
    //console.log('query = ', q);
    const qjson = await q.json()
    //console.log(qjson)
    res.send(qjson)
})

export default PriceHistory