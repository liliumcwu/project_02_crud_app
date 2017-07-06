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
    $wrongA = $('#wrong-a'),
    $wrongB = $('#wrong-b'),
    $wrongC= $('#wrong-c'),
    $submitButton = $('#submit-button'),
    $deleteButton = $('.delete-button');
    $newAnswer = $('#new-answer'),
    $updateAnsButton = $('#new-answer-button');

function addCard(evt) {
  console.log('in main.js addCard function');
  // error checking for just whitespace
  if (!(/\S/.test($question.val()) && /\S/.test($answer.val())
      && /\S/.test($wrongA.val()) && /\S/.test($wrongB.val())
      && /\S/.test($wrongC.val()))) {
    // string is just whitespace
    window.alert("Please fill in all the fields.")
    return;
  }
  var data = {};
  data.question = $question.val();
  data.answer = $answer.val();
  data.wrongAnswers = [$wrongA.val(), $wrongB.val(), $wrongC.val()];
  var color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

  /* from user Alnitak at question
    https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black */
  var c = color.substring(1);      // strip #
  var rgb = parseInt(c, 16);   // convert rrggbb to decimal
  var r = (rgb >> 16) & 0xff;  // extract red
  var g = (rgb >>  8) & 0xff;  // extract green
  var b = (rgb >>  0) & 0xff;  // extract blue
  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  while (luma > 128) {
    console.log('color ' + color + ' was too bright. Trying another color.');
    color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    c = color.substring(1);      // strip #
    rgb = parseInt(c, 16);   // convert rrggbb to decimal
    r = (rgb >> 16) & 0xff;  // extract red
    g = (rgb >>  8) & 0xff;  // extract green
    b = (rgb >>  0) & 0xff;  // extract blue
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  }

  data.cardColor = color;

  $.post('/cards', { value: data});

  $question.val('');
  $question.blur();
  $answer.val('');
  $answer.blur();
}

function deleteCard(evt) {
  if (window.confirm("Do you really want to delete this card?")) {
    var event = $(evt.target);
    var id = event.val();
    var remId = '#' + id;
    $.post('/cards/delete/' + id, {value: id}, (res) => {
      if (res.status === 200) $(remId).remove();
    });
  }
}

/* Need to add user credentials */
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







