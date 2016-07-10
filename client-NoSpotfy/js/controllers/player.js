var now       = -1;
var tam       = 0;
var playList  = null;
var id        = window.location.href.split("=")[1].split('&')[0];
var shuffle   = false;
var all       = false;

window.onload = function(){
  $("#next").click(next);
  $("#previous").click(previous);
  $("#listenAll").click(listenAll);
  $("#loop").click(loop);
  $("#shuffle").click(listenShuffle);
  loadPlayList();
}

function loadPlayList(){

  var name = window.location.href.split("=")[2];

  $("#play").css('background-image',"url('http://"+HOST+":"+PORT_SERV_WEB+"/"+id+"/cover.jpg')");

  getSongs(id,function(json){
    tam = json.songs.length;
    playList = json.songs;
    $("#banda").text(decodeURIComponent(json.songs[0].artist+" - "+name));
    var table = $("#musics").find("table");
    for (var i = 0; i < json.songs.length; i++) {
      var title = decodeURIComponent(encodeURIComponent(json.songs[i].title)).replace(/[\\']/g, '');
      table.append("<tr>"+
                        "<td width='40px'>"+(i+1)+"</td>"+
                        "<td><a onclick='loadMusic("+i+",\""+title+"\","+id+","+json.songs[i].number+")'>"+title+"</a></td>"+
                      "</tr>");
    }
  });
}

function next(){
  now = (now+1)%tam;
  var music = playList[now];
  loadMusic(now,music.title,id,music.number);
}

function previous(){
  now = (now-1)%tam;
  now = now < 0? tam-1:now;
  var music = playList[now];
  loadMusic(now,music.title,id,music.number);
}

function loop(){
  document.getElementById("player").loop = !document.getElementById("player").loop;
  if(document.getElementById("player").loop){
    $("#loop").attr("src","../img/loop-true.png");
  }else{
    $("#loop").attr("src","../img/loop-false.png");
  }
}

function playShuffle() {
  var ind = Math.floor(Math.random() * playList.length);
  now = ind;
  var music = playList[now];
  loadMusic(now,music.title,id,music.number);
}

function playAll() {
  now = (now+1)%tam;
  var music = playList[now];
  loadMusic(now,music.title,id,music.number);
}

function listenAll(){
  all = !all;
  if(all){
    $("#listenAll").attr("src","../img/listen-true.png");

    if (now < 0) {
      var music = playList[0];
      loadMusic(0,music.title,id,music.number);
    }

    document.getElementById("player").addEventListener('ended',playAll);
  }else{
    document.getElementById("player").removeEventListener('ended',playAll);
    $("#listenAll").attr("src","../img/listen-false.png");
  }
}

function listenShuffle(){
  shuffle = !shuffle;
  if(shuffle){
    $("#shuffle").attr("src","../img/shuffle-true.png");

    if (now < 0) {
      var ind = Math.floor(Math.random() * playList.length);
      var music = playList[ind];
      loadMusic(0,music.title,id,music.number);
    }

    document.getElementById("player").addEventListener('ended',playShuffle);

  }else{
    document.getElementById("player").removeEventListener('ended',playShuffle);
    if(all){
      all = false;
      listenAll();
    }
    $("#shuffle").attr("src","../img/shuffle-false.png");
  }
}

function loadMusic(ind,music, idAlbum, idMusic){
  document.getElementById('nameMusic').innerHTML = music;
  document.getElementById("player").src = "http://"+HOST+":"+PORT_SERV_WEB+"/"+idAlbum+"/"+idMusic+".mp3";
  document.getElementById("player").load();
  now = ind;
}
