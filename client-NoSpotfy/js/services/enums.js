var path = require('path');
var fs   =  require('fs');

var appDir = path.dirname(require.main.filename);
var jsonFile =  fs.readFileSync(appDir + path.sep + "config.json");
var json = JSON.parse(jsonFile);

var HOST = json.server;
var PORT_SEND = "53105";
var PORT_RCVS = "7331";
var PORT_SERV_WEB = "8080";
