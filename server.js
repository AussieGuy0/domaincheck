const express = require('express')
const app = express()
const domainService = require('./service/domain')
const View = require('./view/views')

const apiUrl = '/api/v1/'
const encoding = 'utf-8'

app.get(`${apiUrl}:domain`, (req,res) => {
    const domainUrl = req.params.domain;
    const domainCheck = domainService.checkDomain(domainUrl, (data) => res.end(data, encoding));
});

/**
 * Checks the domain given in the query parameter 'domain' and returns a HTML view of the result.
 */
app.get('/checkDomain', (req, res) => {
    const domainUrl = req.query.domain;    
    domainService.checkDomain(domainUrl, (whois) => {
        if (whois.found) {
            var view = new View("takenDomain", whois);
            res.end(view.render());
        } else {
            res.end(JSON.stringify(whois), encoding);
        }
    });
});

/**
 * Creates a subscribe endpoint which requires two query parameters: domain and email.
 */
app.get('/subscribe', (req, res) => {
    const domainUrl = req.query.domain;
    const email = req.query.email;

    res.end(`Sent a verification email to ${email}`);

});

app.use(express.static("public"));

module.exports = {
    listen: function(port) {
        if (this.server != null) {
            this.close();
        }
        this.server = app.listen(port, () => console.log(`App running on port ${port}`));
    },
    close: function() {
        this.server.close(() => console.log("Server closed!"));
        this.server = null;
    }
}
    

