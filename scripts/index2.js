$(document).ready(function(){
    feather.replace();

    var video = document.querySelector('#videoPlayer');
      var msg = document.querySelector('#msg');
      
      // When we get the playing event, show what source is used and what type it is.
      video.addEventListener('playing', function () {
        var currentSource = video.querySelector('[src="' + video.currentSrc + '"]');
        msg.setAttribute('text', 'value', video.currentSrc + '\n' + currentSource.type);                
      });
    
});
