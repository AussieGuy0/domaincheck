const net = require('net')
const dns = require("dns")

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
    checkDomain: function (domainUrl, callback) {
        const server = domainUrl.substring(domainUrl.lastIndexOf(".") + 1) + ".whois-servers.net"
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
                    const notFound = {found: false}
                    callback(whoisObject);
                } else {
                    const whoisObject = this.convertWhois(data);
                    callback(whoisObject);

                }
            });
        }); 
        return callback;
    },
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

                const line = e.split(':');
                const key = toCamelCase(line[0].trim());
                const value = line[1].trim();

                data[key] = value;
            });
            out.data = data;
            return out;
        }
    }
}
