var version = 'SNAPSHOT';
var os = require('os')
var util = require('util')

const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

const secondsToTime = (s) => {
  const minute = 60;
  const hour = 3600;
  const day = 86400;

  if (s >= day) {
    return (s / day, 2).toFixed(2) + ' ' + 'days';
  } else if (s >= hour) {
    return (s / hour).toFixed(2) + ' ' + 'hours';
  } else if (s >= minute) {
    return (s / minute, 2).toFixed(2) + ' ' + 'minutes';
  } else {
    return s + ' seconds';
  }
};

var stars = '';
for(var i = 0, len = version.length; i < len; i++) {
  stars = stars.concat('*');
}

var http = require('http');
var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.write('************************************************' + stars + '**\n');
  response.write('* This is simple NodeJS os application version: ' + version + ' *\n');
  response.write('************************************************' + stars + '**\n\n');

  response.write('Hostname: ' + os.hostname() + '\n');
  response.write('Operating system: ' + os.type() + '\n');
  response.write('Platform: ' + os.platform() + '\n');
  response.write('OS release: ' + os.release() + '\n');
  response.write('Uptime: ' + secondsToTime(os.uptime()) + '\n');
  response.write('Uptime in seconds: ' + os.uptime() + '\n');
  response.write('Load AVG: ' + os.loadavg() + '\n');
  response.write('Total memory: ' + bytesToSize(os.totalmem()) + '\n');
  response.write('Free memory: ' + bytesToSize(os.freemem()) + '\n');
  cpus = os.cpus();
  response.write('Number of CPUs: ' + cpus.length + '\n');
  response.write('CPUs status: \n');
  response.write(util.inspect(cpus, false, null));
  response.write('\n');
  networks = os.networkInterfaces();
  response.write('Number of networks interfaces: ' + Object.getOwnPropertyNames(networks).length + '\n');
  response.write('Network interfaces: \n');
  response.write(util.inspect(networks, false, null));
  response.end('\n');
};
var www = http.createServer(handleRequest);
www.listen(8080);
console.log('Started NodeJS application on host: ' + os.hostname());
console.log('Listening on port: 8080')
