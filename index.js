const express = require('express')
const app = express()
const domainService = require('./service/domain')
const View = require('./view/views')

const port = 3000;
const apiUrl = '/api/v1/'
const encoding = 'utf-8'

app.get(`${apiUrl}:domain`, (req,res) => {
    const domainUrl = req.params.domain;
    const domainCheck = domainService.checkDomain(domainUrl, (data) => res.end(data, encoding));
});

app.get('/checkDomain', (req, res) => {
    const domainUrl = req.query.domain;    
    const domainCheck = domainService.checkDomain(domainUrl, (whois) => { 
        if (whois.found) {
            var view = new View("takenDomain", whois);
            res.end(view.render());
        } else {
            res.end(JSON.stringify(whois), encoding);
        }
    });
});

app.get('/subscribe', (req, res) => {
    const domainUrl = req.query.domain;
    const email = req.query.email;

    res.end(`Sent a verfication email to ${email}`);

});

app.use(express.static("public"));

app.listen(port, () => console.log(`App running on port ${port}`));

