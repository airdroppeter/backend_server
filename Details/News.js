import express from 'express';

const News = express.Router();

News.get("/", async (req, res) => {
    //console.log('in finding competitors:');
    //console.log('getting in: ', req.query)
    //console.log('getting in bis: ', req.query.ticker)
    console.log(req.query.ticker)
    const q = await fetch('https://financialmodelingprep.com/api/v3/stock_news?tickers='+ req.query.ticker +'&limit=50&apikey=fe07eefb7e22e24d5733a2ff74b998bb')
    const qjson = await q.json()
    //console.log(qjson)
    res.send(qjson)
})

export default News