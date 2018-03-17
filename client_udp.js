//https://nodejs.org/api/dgram.html

const dgram = require('dgram');

var sinfo = {
    address : '192.168.244.190',
    port : '41234',
}

const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');

client.on("message", function(msg, rinfo) {
    //console.log("recieved: " + msg.toString("hex"));
    console.log("recieved: " + msg);
    //client.close();
  });

testsend();

// https://nodejs.org/en/docs/guides/timers-in-node/
const intervalObj = setInterval(() => {
    //console.log('interviewing the interval');
    testsend()        
}, 5000);
//clearInterval(intervalObj);

function testsend() {
    client.send(message, sinfo.port, sinfo.address, (err) => {
        //client.close();
      });      
}
