$(document).ready(function(){
  // get player dimensions
  var w = parseInt($('.video__wrapper').css('width'));
  var h = parseInt($('.video__wrapper').css('height'));

  // load mediaelement player js and 
  // use dimensisons from above variables
  $('video, audio').mediaelementplayer({
    features: ['playpause','fullscreen','volume','current','progress'],
    startLanguage: 'en',
    stretching: 'responsive',
    // if the <video width> is not specified, this is the default
    defaultVideoWidth: h,
    // if the <video height> is not specified, this is the default
    defaultVideoHeight: w,
    // if set, overrides <video width>
    videoWidth: w,
    // if set, overrides <video height>
    videoHeight: h,                    
  });

  // jQuery way 
  // loop over all spans and highlight
  // current span where video is playing at
  // using the active class
  $('#myVideo').on('timeupdate',function(event){

    var $vid = $('#myVideo')[0];

    var captions = $('.captions span');
    for (i = 0; i < captions.length; ++i) {
      const start = captions[i]['attributes']['data-start']['value'];
      const end = captions[i]['attributes']['data-end']['value'];
      // debug
      // console.log("start == "  + start);
      // console.log("end == " + end);
      // console.log(" current time == " +  $vid.currentTime );
      if ($vid.currentTime > start && $vid.currentTime < end) {          
        $(captions[i]).addClass('active');            
      } else {
        $(captions[i]).removeClass('active');            
      }            
    }

  }); // end timeupdate

  // event listener for click on caption and
  // seeking directly to that clicked part of
  // the video
  $('.captions span').on('click', function(){
    const start = $(this).data('start');
    const end = $(this).data('end');
    // skip to clicked span start time
    $('#myVideo')[0].currentTime = start;
    $('#myVideo')[0].play();
  });          

  // js way
  // Get the video element with id="myVideo"
  // var x = document.getElementById("myVideo");

  // // Attach a timeupdate event to the video element, and execute a function if the current playback position has changed
  // x.addEventListener("timeupdate", myFunction);

  // function myFunction() {
  //     // Display the current position of the video in a p element with id="demo"
  //     document.getElementById("demo").innerHTML = x.currentTime;
  // }      
});