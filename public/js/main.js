console.log('hiiii from main.js');

var url = "mongodb://localhost:27017/cardProject";

$(".button-collapse").sideNav();

$(document).ready(function(){
  var url = window.location.pathname;
  $(".navbar-fixed nav div ul li").each(function(){
    if($(this).children().attr("href") == url)
      $(this).addClass("active");
  });
  // $('#modal_595ff3513a43b0ed58d370ce').modal();
  $('.modal').modal();

})

var $question = $('#card-question'),
    $answer = $('#card-ans'),
    $wrong1 = $('#wrong-1'),
    $wrong2 = $('#wrong-2'),
    $wrong3 = $('#wrong-3'),
    $indexSubmitButton = $('#index-submit-button'),
    $deleteButton = $('.delete-button');
    $newAnswer = $('#new-answer'),
    $updateAnsButton = $('#new-answer-button'),
    $cardsSubmitButton = $('#cards-submit-button_595ff3513a43b0ed58d370ce'),
    $cardsSubmitButton2 = $('#cards-submit-button_595ff4310b78e9edfd8d9d02'),
    allCardsSubmitButtons = document.getElementsByClassName('buttonbears');


  // $('.modal').modal({
  //     dismissible: true, // Modal can be dismissed by clicking outside of the modal
  //     ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
  //       alert("Ready");
  //       console.log(modal, trigger);
  //     },
  //     complete: function() { alert('Closed'); } // Callback for Modal close
  //   }
  // );

function addCard(evt) {
  console.log('in main.js addCard function');
  // error checking for just whitespace
  if (!(/\S/.test($question.val()) && /\S/.test($answer.val())
      && /\S/.test($wrong1.val()) && /\S/.test($wrong2.val())
      && /\S/.test($wrong3.val()))) {
    // string is just whitespace
    window.alert("Please fill in all the fields.");
    return;
  }
  var data = {};
  data.question = $question.val();
  data.answer = $answer.val();
  data.wrong1 = $wrong1.val();
  data.wrong2 = $wrong2.val();
  data.wrong3 = $wrong3.val();
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
  $wrong1.val('');
  $wrong1.blur();
  $wrong2.val('');
  $wrong2.blur();
  $wrong3.val('');
  $wrong3.blur();
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
  data.cardId = window.location.pathname.substring(7, 31);
  console.log('cardId is ' + data.cardId);
  var classSelect = '.' + data.cardId;

  $.ajax({
     url: '/cards/' + data.cardId,
     type: 'PUT',
     dataType: 'json',
     data: {value: data},
     success: function(data, response) {
      console.log('data is', data);
       $(classSelect).load(location.href + " " + classSelect + ">*","");
     }
  });

  // $.post('/cards/' + data.cardId, { value: data}, (res) => {
  //   console.log(res);
  //   $(classSelect).load(location.href + " " + classSelect + ">*","");
  // });
  $question.val('');
  $question.blur();
  $answer.val('');
  $answer.blur();
}

// $('.cards-submit-buttons').click(function() {
//     // here you could use "this" to get the DOM element that was clicked.
//     console.log('hullo');
// });

function checkAns(evt) {
  console.log('whatsup');
  var id = this.parentNode.parentNode.id.slice(6);
  console.log('iddddddd is ' + id);
  var radios = document.getElementsByName(id);

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
        // var radioId = '#test' + i;
        // console.log('radioId is ' + radioId);
        console.log('radio ' + i + '\'s value is ' + radios[i].value);
        // console.log('radios[i].parentNode.parentNode.parentNode.id is ' + radios[i].parentNode.parentNode.parentNode.id);
        $.get('/cards/' + id, {value: id}, (res) => {
          console.log('res is ', res);
          console.log('res.answer is', res.answer);
          if (radios[i].value === res.answer) {
            Materialize.toast('correct answer!');
          }
          else Materialize.toast('nahhhhhh');
        });

        break; // since only one will be checked
    }
  }
}

$indexSubmitButton.on('click', addCard);
$("#wrong-3").keyup(function(event){
    console.log('something happened');
    if(event.keyCode == 13)
      $("#index-submit-button").click();

});

$deleteButton.on('click', deleteCard);
$updateAnsButton.on('click', updateCard);
$("#new-answer").keyup(function(event) {
  console.log('umm');
  if (event.keyCode == 13) {
    $("#new-answer-button").click();
  }
});
// $cardsSubmitButton.on('click', checkAns);
// $cardsSubmitButton2.on('click', checkAns);
// $('.cards-submit-buttons').on('click', checkAns);
[].forEach.call(allCardsSubmitButtons, function(element) {
  element.addEventListener('click', checkAns);
});








