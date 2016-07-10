window.onload = function(){
  loadCatalog();
}

function loadCatalog(){
  getAlbuns(function(json){
      console.log(json);
      var catalog = $("#catalogo");
      for (var i = 0; i < json.albuns.length; i++) {
        catalog.append("<a href='templates/player.html?id="+json.albuns[i].id+"&name="+json.albuns[i].title+"' style='text-decoration: none;'>"+
                          "<div style='"+setClass+"' class='album' align='center'>"+
                            "<img src='http://"+HOST+":"+PORT_SERV_WEB+"/"+json.albuns[i].id+"/cover.jpg' width='150px' height='150px' />"+
                            "<font color='white' >"+
                              "<font size='3' face='Arial' color='white'><h4>"+json.albuns[i].title+"<br>"+json.albuns[i].artist+"</h4></font>"+
                            "</font>"+
                          "</div>"+
                        "</a>");
      }
    }
  );
}

function setClass(){
  return "border-radius: 6px; float: left;margin: 10px;padding: 10px;background-color: #1C1C1C;transition-property: background-color;transition-duration: 0.25s;transition-timing-function: linear;"
}

/*
function tocar(){
  $("#music").append("<source src=\"music/anthrax.mp3\" type=\"audio/mpeg\" />")
  var client = new net.Socket();
  client.connect(PORT, HOST, function() {
  	console.log('Connected');
  	client.write('Hello, server! Love, Client.');
  });

  client.on('data', function(data) {
    fs.appendFileSync('client-NoSpotfy/music/anthrax.mp3',data);
  });

  client.on('close', function() {
  	console.log('Connection closed');
  });
}

function getCatalog(callback){
  fs.readFile(process.cwd()+'/client-NoSpotfy/js/test/catalogo.json', function(err,data){
    if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
    }
    var catalog = JSON.parse(data.toString());
    callback(catalog);
  });
}
*/
