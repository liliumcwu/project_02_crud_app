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
    $deleteButton = $('.delete-button');
    $newAnswer = $('#new-answer'),
    $updateAnsButton = $('#new-answer-button');

function addCard(evt) {
  console.log('in main.js addCard function');
  var data = {};
  data.question = $question.val();
  data.answer = $answer.val();

  $.post('/cards', { value: data});

  $question.val('');
  $question.blur();
  $answer.val('');
  $answer.blur();
}

function deleteCard(evt) {
  var event = $(evt.target);
  var id = event.val();
  var remId = '#' + id

  $.post('/cards/delete/' + id, {value: id}, (res) => {
    if (res.status === 200) {
      $(remId).remove();
    }
  })
}

function updateCard(evt) {
  console.log('in main.js updateCard function');
  var data = {};
  data.newAns = $newAnswer.val();
  data.cardId = window.location.pathname.substring(7);
  console.log('cardId is ' + data.cardId);
  var classSelect = '.' + data.cardId;

  $.post('/cards/' + data.cardId, { value: data}, (res) => {
    console.log(res);
    $(classSelect).load(location.href + " " + classSelect + ">*","");
  });
  $question.val('');
  $question.blur();
  $answer.val('');
  $answer.blur();
}


$submitButton.on('click', addCard);
$deleteButton.on('click', deleteCard);
$updateAnsButton.on('click', updateCard);







