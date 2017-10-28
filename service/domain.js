const net = require('net');
const dns = require("dns");
const log = require('../util/log');

const noMatchStart = 'No match';
const lineEnding = '\r\n';

/**
 * Converts a string to camelcase.
 *
 * TODO: Make better. Works for our needs currently.
 */
function toCamelCase(str) {
    let out = "";

    out += str.charAt(0).toLowerCase();
    out += str.substr(1).replace(/ /g, "");
    return out;
}


module.exports = {
    verifyDomain: function (domainUrl) {
        return verifyLength(domainUrl) && verifyFormat(domainUrl);

        function verifyLength(domainUrl) {
            return domainUrl.length > 0 && domainUrl.length < 255;
        }

        function verifyFormat(domainUrl) {
            const index = domainUrl.indexOf('.');
            if (index === -1) {
                return false;
            }

            const domain = domainUrl.substring(0, index);
            const regex = /^[A-Za-z\-0-9]+$/;

            if (!regex.test(domain)) {
                return false;
            }

            const tld = domainUrl.substring(index);

            return tld === ".com";

        }


    },
    /**
     * A async function that runs a whois on the given domainURL and returns an object of the result.
     *
     * @param domainUrl {string} The url that will be checked
     * @param callback {function(object)} A function that is called when the whois query has completed
     */
    checkDomain: function (domainUrl, callback) {
        const server = domainUrl.substring(domainUrl.lastIndexOf(".") + 1) + ".whois-servers.net";
        const port = 43;

        dns.resolveCname(server, (error, addresses) => {
            let host;

            if (!error) {
                host = addresses[0];
            } else {
                host = server;
            }

            const socket = net.createConnection(port, host, () => {
                socket.write(`domain ${domainUrl} ${lineEnding}`, 'ascii');
            });

            socket.setEncoding('ascii');

            let data = '';
            socket.on('data', (response) => {
                data = data + response;
            }).on("close", (error) => {
                if (error) {
                    const notFound = {found: false};
                    callback(notFound);
                } else {
                    log.trace(`Got response for domain: ${domainUrl} - ${data} `);
                    const whoisObject = this.convertWhois(data);
                    callback(whoisObject);

                }
            });
        }); 
    },
    /**
     * Parses whoisText string response into an object
     * @param whoisText the string response from a whois query
     * @returns {object}
     */
    convertWhois: function(whoisText) {
        const out = {};
        if (whoisText.startsWith(noMatchStart)) {
            out.found = false;
            return out;
        } else {
            const lines = whoisText.split(lineEnding);
            out.found = true;
            const data = {};
            lines.some((e) => {
                if (e.startsWith(">>>")) {
                    return true; 
                }

                const line = e.split(': ');
                if (line.length === 2) {
                    const key = toCamelCase(line[0].trim());
                    const value = line[1].trim();

                    data[key] = value;
                }
            });
            out.data = data;
            return out;
        }
    }
};
