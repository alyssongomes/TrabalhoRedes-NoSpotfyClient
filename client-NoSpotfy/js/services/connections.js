var net    = require('net');
var fs     = require('fs');

var client = new net.Socket();

function getAlbuns(callback){

  client.connect(PORT_RCVS, HOST, function() {
  	client.write('getAlbuns');
  });

  client.on('data', function(data) {
    var str = new TextDecoder("utf-8").decode(data);
    var catalog = JSON.parse(str);
    callback(catalog);
  });
}

function getSongs(id,callback){
  client.connect(PORT_RCVS, HOST, function() {
    client.write('album='+id);
  });

  client.on('data', function(data) {
    var str = new TextDecoder("utf-8").decode(data);
    var songs = JSON.parse(str);
    callback(songs);
  });
}

function sendAlbum(file,callback){

  client.connect(PORT_SEND,HOST,function() {
    var fileStream = fs.createReadStream(file.path);
    fileStream.on('error', function(err){
        console.log(err);
        callback("Erro ao enviar");
    })

    fileStream.on('open',function() {
        fileStream.pipe(client);
    });

    fileStream.on('close',function() {
        callback("Album enviado");
    });

  });
}
