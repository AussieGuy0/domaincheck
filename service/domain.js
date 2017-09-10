const net = require('net')
const dns = require("dns")

module.exports = {
	checkDomain: function (domainUrl, callback) {
		const server = domainUrl.substring(domainUrl.lastIndexOf(".") + 1) + ".whois-servers.net"
		const port = 43;

		dns.resolveCname(server, function(error, addresses) {
			var host = "";

			if(!error) host = addresses[0];
			else host = server;

			var socket = net.createConnection(port, host, function() {
				socket.write(`domain ${domainUrl} \r\n`, 'ascii');
			});

			socket.setEncoding('ascii');

			var data = '';
			socket.on('data', function(response) {
				data = data + response;
			}).on("close", function(error) {
				if (error) {
					data = 'No WHOIS data for this domain!';
				}
				callback(data);
			});
		}); 
		return callback;
	}
}
