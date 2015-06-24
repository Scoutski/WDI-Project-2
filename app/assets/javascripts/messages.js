var app = app || {};

$(document).ready(function(){
  console.log("socket chat demo ");
  
  channel = app.dispatcher.subscribe('message')

  channel.bind('transmit', function(data){

    console.log(data);
    var message = "<p>" +  data.currtime + ':: ' + data.user + ':: ' + data.message + "</p> " ;
    console.log(message);
    $('#messages').append(message);

  })

  $('#message').on('keydown', function(e) {
  var $this;
  $this = $(this);

  if (e.keyCode === 13) {
    console.log('You hit enter');
    message = $this.val();
    $this.val('');

    app.dispatcher.trigger('message.transmit', message);
  }
});


});
