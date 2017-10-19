const express = require('express');
const app = express();
const domainService = require('./service/domain');
const View = require('./view/views');
const log = require('./util/log');
const DataStoreAccessor = require('./service/dataStoreAccessor');

const apiUrl = '/api/v1/';
const encoding = 'utf-8';

const db = new DataStoreAccessor();

app.get(`${apiUrl}:domain`, (req, res) => {
    const domainUrl = req.params.domain;
    domainService.checkDomain(domainUrl, (data) => res.end(data, encoding));
});

/**
 * Checks the domain given in the query parameter 'domain' and returns a HTML view of the result.
 */
app.get('/checkDomain', (req, res) => {
    const domainUrl = req.query.domain;
    log.debug(`Checking domain: ${domainUrl}`);
    if (!verifyDomain(domainUrl)) {
        res.redirect("/");
    } else {
        domainService.checkDomain(domainUrl, (whois) => {
            if (whois.found) {
                let view = new View("takenDomain", whois);
                res.end(view.render());
            } else {
                res.end(JSON.stringify(whois), encoding);
            }
        });

    }
});

/**
 * Creates a subscribe endpoint which requires two query parameters: domain and email.
 */
app.get('/subscribe', (req, res) => {
    const domainUrl = req.query.domain;
    const email = req.query.email;
    db.createUser(email)
        .then(() => {
            log.trace(`Created user with email ${email}`);
            res.end(`Sent a verification email to ${email}`);
        })
        .catch((error) => {
            log.warn(error);
        })


});

app.use(express.static("public"));

function verifyDomain(domainUrl) {
    return verifyLength(domainUrl) && verifyFormat(domainUrl);

    function verifyLength(domainUrl) {
       return domainUrl.length > 0 && domainUrl.length < 255;
    }

    function verifyFormat(domainUrl) {
        return domainUrl.indexOf('.') > -1;
    }

}

module.exports = {
    listen: function (port) {
        if (this.server != null) {
            this.close();
        }
        this.server = app.listen(port, () => log.debug(`App running on port ${port}`));
    },
    close: function () {
        this.server.close(() => log.debug("Server closed!"));
        this.server = null;
    }
};
