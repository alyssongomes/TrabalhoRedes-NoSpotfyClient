var path = require('path');
var fs   =  require('fs');
var host = sessionStorage.getItem('server');
if(host == undefined)
{
  var appDir = path.dirname(require.main.filename);
  var jsonFile =  fs.readFileSync(appDir + path.sep + "config.json");
  var json = JSON.parse(jsonFile);
  sessionStorage.setItem('server',json.server);
  host = json.server;
}

var HOST = host;
var PORT_SEND = "53105";
var PORT_RCVS = "7331";
var PORT_SERV_WEB = "8080";
