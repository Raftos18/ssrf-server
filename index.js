const fs = require('fs');
var cors = require('cors');

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5001

express()
    .use(cors())
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/exploit', (req, res) => res.render('pages/exploit'))
    .get('/flag', (req, res) => {
        const flag = `${req.query.flag}`;
        console.log('Flag', flag);
        fs.writeFileSync('public/data/flag.txt', flag);
        res.send('flag saved');
    })
    .get('/save', (req, res) => {
        let flag = req.query.flag;
        console.log("Saving flag", flag);
        fs.writeFileSync('public/data/flag.txt', flag, 'utf-8')
        res.end(flag);
    })
    .get('/view', (req, res) => {
        const flag = fs.readFileSync('public/data/flag.txt', 'utf8')
        res.send(flag);
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))