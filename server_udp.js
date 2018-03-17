//https://nodejs.org/api/dgram.html

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

var sinfo = {
    address : '0.0.0.0',
    port : '41234',
}

var clients = [];

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  testsendback(msg,rinfo);
  var c = rinfo.address+':'+rinfo.port
  clients[c] = { 
      client: c,
      address: rinfo.address,
      port: rinfo.port,
    };
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(sinfo.port);
// server listening 0.0.0.0:41234

const intervalObj = setInterval(() => {
    //console.log('interviewing the interval');
    hello()        
}, 10000);

function testsendback(msg,rinfo) {
    var message = Buffer.from(msg);
    //var message = msg;
    server.send(message, rinfo.port, rinfo.address, (err) => {
        //client.close();
    });
}

function hello() {
    for(c in clients) {
        //console.log(c);
        //console.log(clients[c]);
        var rinfo = clients[c];
        testsendback('hello',rinfo);
    }
}
