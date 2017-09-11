const express = require('express')
const app = express()
const domainService = require('./service/domain')

const port = 3000;
const apiUrl = '/api/v1/'
const encoding = 'utf-8'

app.get(`${apiUrl}:domain`, (req,res) => {
    const domainUrl = req.params.domain;
    const domainCheck = domainService.checkDomain(domainUrl, (data) => res.end(data, encoding));
});

app.get('/checkDomain', (req, res) => {
    const domainUrl = req.query.domain;    
    const domainCheck = domainService.checkDomain(domainUrl, (data) => { 
        res.end(JSON.stringify(data), encoding);
    });
});

app.use(express.static("public"));

app.listen(port, () => console.log(`App running on port ${port}`));
