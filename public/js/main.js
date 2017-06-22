console.log('hiiii from main.js');

var url = "mongodb://localhost:27017/cardProject";

$(".button-collapse").sideNav();

$(document).ready(function(){
  var url = window.location.pathname;
  $(".navbar-fixed nav div ul li").each(function(){
    if($(this).children().attr("href") == url)
      $(this).addClass("active");
  })
})

var $question = $('#card-question'),
    $answer = $('#card-ans'),
    $submitButton = $('#submit-button'),
    $deleteButton = $('#delete-button');

function deleteCard(evt) {
  console.log('wazzup');
  var event = $(evt.target);
  var id = event.val();
  var remId = '#' + id

  $.post('/cards/delete/' + id, {value: id}, (res) => {
    if (res.status === 200) {
      $(remId).remove();
    }
  })
}

function addCard(evt) {
  // var data ={};
  // data.newRent = $('#update-rent').val();
  // data.houseId = window.location.pathname.substring(8);

  // var classSelect = '.' + data.houseId
  console.log('in main.js addCard function');
  var data = {};
  data.question = $question.val();
  data.answer = $answer.val();

  // $.post('/update-rent', { value:  data}, (res) => {
  //   console.log(res)
  //   $(classSelect).load(location.href + " " + classSelect + ">*","");
  // })

  $.post('/cards', { value: data});

  $question.val('');
  $question.blur();
  $answer.val('');
  $answer.blur();
}


// function seeCards(evt) {
//   $.get("test.php", function( data ) {
//     $( "body" )
//       .append( "Question: " + data.question )
//       .append( "Answer: " + data.answer );
//   }, "json" );
// }

$submitButton.on('click', addCard);
$deleteButton.on('click', deleteCard);







