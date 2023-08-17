import express from 'express';

const Screener = express.Router();

Screener.get("/", async (req, res) => {
    const div = req.query.divmorethan;
    const sector = req.query.sector;
    const price = req.query.pricemorethan
    //console.log(price, sector, div);
    const q = await fetch('https://financialmodelingprep.com/api/v3/stock-screener?dividendMoreThan='+div+'&sector='+sector+'&priceMoreThan='+price+'&exchange=NYSE&limit=50&apikey=fe07eefb7e22e24d5733a2ff74b998bb')
    const qjson = await q.json()
    res.send(qjson)
})

export default Screener