window.onload = function(){
  init();
}

function init(){
  $("input:file").jfilestyle({inputSize: "400px" });
  $("#sendAlbum").click(function(){
    getFile();
  });
}

function getFile(){
  if($("input:file").get(0).files.length === 0){
    alert("Selecione um album");
  }else{
    var file = $("input:file").get(0).files[0];
    sendAlbum(file,function(result){
      alert(result);
      location.reload();
    });
  }
}
