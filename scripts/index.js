$(document).ready(function(){
    feather.replace();

    var player = document.querySelector("#videoPlayer");
    var dash_player;
    var hls_player;
    var extension = '';

    $("#button-load-mdp").on('click', function(event) {
        var url = $("#input-mdp").val();
        extension = '';
        extension = url.split('.');
        if(extension[extension.length-1] == 'mpd'){
            play_dash(url, player, hls_player, dash_player);
        }else if(extension[extension.length-1] == 'm3u8'){
            play_hls(url, player, hls_player, dash_player);
        }else{
            alert('File not supported, please use .mpd or .m3u8.');
        }
    });

    $("#button-load").on('click', function(event) {
        var protocol_option = $("#protocol option:selected");
        var video_quality_option = $("#video_quality option:selected");
        var url = "";
        if(protocol_option.val() == "DASH"){
            switch (video_quality_option.val()) { 
                case '480p': 
                    url = 'http://localhost:8011/dash/stream_low.mpd';
                    break;
                case '720p': 
                    url = 'http://localhost:8011/dash/stream_med.mpd';
                    break;
                case '1080p': 
                    url = 'http://localhost:8011/dash/stream_high.mpd';                     
                    break;
            }
            play_dash(url, player, hls_player, dash_player);

        }else{
            switch (video_quality_option.val()) { 
                case '480p': 
                    url = 'http://localhost:8011/hls/stream_low.m3u8';
                    break;
                case '720p': 
                    url = 'http://localhost:8011/hls/stream_med.m3u8';
                    break;
                case '1080p': 
                    url = 'http://localhost:8011/hls/stream_high.m3u8';                     
                    break;
            }
            play_hls(url, player, hls_player, dash_player);
        }
    });
    
    function detach_media(hls, dash){
        try{
            if (typeof hls !== 'undefined'){
                hls.detachMedia();
            }
        }catch(error){
            console.error(error);
        }
        try{
            if (typeof dash_player !== 'undefined'){
                dash_player.reset();
            }
        }catch(error){
            console.error(error);
        }
    }

    function play_hls(url, player, hls_player, dash_player){
        detach_media(hls_player, dash_player);
        hls_player = new Hls();
        hls_player.loadSource(url);
        hls_player.attachMedia(player);
        hls_player.on(Hls.Events.MANIFEST_PARSED,function() {
            video.play();
        });
    }

    function play_dash(url, player, hls_player, dash_player){
        detach_media(hls_player, dash_player);
        dash_player = dashjs.MediaPlayer().create();
        dash_player.initialize(player, null, true);            
        dash_player.attachSource(url);
    }
});
