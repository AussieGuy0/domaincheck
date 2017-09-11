const net = require('net')
const dns = require("dns")

const noMatchStart = 'No match';
const lineEnding = '\r\n'

function convertWhois(whoisText) {
    const out = {};
    if (whoisText.startsWith(noMatchStart)) {
        out.found = false;
        return out;
    } else {
        const lines = whoisText.split(lineEnding);
        const out.found = true;
        const data = {};
        lines.some((e) => {
            if (e.startsWith(">>>")) {
                return true; 
            }

            const line = e.split(':');
            const key = line[0].trim();
            const value = line[0].trim();

            data[key] = value;
        });
        out.data = data;
        return out;
    }
}

module.exports = {
    checkDomain: function (domainUrl, callback) {
        const server = domainUrl.substring(domainUrl.lastIndexOf(".") + 1) + ".whois-servers.net"
        const port = 43;

        dns.resolveCname(server, function(error, addresses) {
            var host = "";

            if(!error) host = addresses[0];
            else host = server;

            var socket = net.createConnection(port, host, function() {
                socket.write(`domain ${domainUrl} ${lineEnding}`, 'ascii');
            });

            socket.setEncoding('ascii');

            var data = '';
            socket.on('data', function(response) {
                data = data + response;
            }).on("close", function(error) {
                if (error) {
                    data = 'No WHOIS data for this domain!';
                }
                callback(convertWhois(data));
            });
        }); 
        return callback;
    }
}
