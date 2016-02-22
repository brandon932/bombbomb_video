// add scripts
$(document).on('ready', function() {
  $('#replay').hide();
  $('#annotationForm').hide();
  $('#myvideo').load();
  var video = document.getElementById("myvideo"), track;
  video.load();

  $('#play').on("click", function(e){
    e.preventDefault();
    if (video.paused === true){
      $('#play').html("pause");
      video.play();
    }else{
      $('#play').html("play");
      video.pause();
    }
  });

  $('#replay').on("click", function(e){
    e.preventDefault();
    video.currentTime=0;
    video.play();
  });

  $('#seek-bar').on("change", function(e){
    var time = video.duration * ($('#seek-bar').val()/100);
    video.currentTime= time;
  });

  $('#myvideo').on("timeupdate", function(e){
     $('#vidTime').html(Math.floor(video.currentTime));
    var position = (100/ video.duration)* video.currentTime;
    $('#seek-bar').val(position);
    if (video.duration === video.currentTime){
      $('#replay').show();
    }else{
      $('#replay').hide();
    }
  });

  $('#seek-bar').on("mousedown", function(e){
    video.pause();
  });

  $('#seek-bar').on("mouseup", function(e){
    video.play();
  });

  $("#volume-bar").on("change", function(e){
    video.volume = $('#volume-bar').val();
  });

  $("#mute").on("click", function(e){
    if (video.muted){
      video.muted = false;
      $("#mute").html("mute");
    }else{
      video.muted = true;
      $("#mute").html("un-mute");
    }
  });
  $("#edit").on("click", function(e){
    e.preventDefault();
  $('#annotationForm').show();
  });

  $("#add").on("click", function(e){
    e.preventDefault();
    var text = $("#text").val();
    var start = $("#start").val();
    var end = $("#end").val();
    console.log(text, start, end);
  track.addCue(new VTTCue(start, end, text));
  });

  // video.addEventListener("loadedmetadata", function() {
     track = video.addTextTrack("captions", "English", "en");
     console.log(track);
  // });
  track.mode = "showing";
  // track.addCue(new VTTCue(0, 12, "[Test]"));


});
