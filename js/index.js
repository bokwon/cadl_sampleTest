/**
 * Created by boyoung on 2/5/16.
 */

//TODO
// add at least 8 more questions
var allQuestions = [{question: "When you drive through a construction zone, you should:",
                    choices: ["Slow down to watch the worker.",
                              "Decrease your following distance.",
                              "Pass the construction zone carefully and not 'rubberneck'."],
                    correctAnswer:2},
                     {question: "To make a right turn at the corner, you:",
                       choices: ["May not enter the bicycle lane.",
                                 "Should only merge into the bicycle lane if you stop before turning.",
                                 "Must merge into the bicycle lane before turning."],
                       correctAnswer:2
                     }];

var questionCounter = 0;
var choices = [];
var quiz = $("#quiz");

var prev = $("#prev");
var next = $("#next");
var start = $("#start");

function appendQuestion(index){
  var qContainer = $('<div>').addClass('qContainer');
  var qNumber = $('<h5>Question ' + (index + 1) + ':</h5>');
  qContainer.append(qNumber);

  var qQuestion = $('<h4>' + allQuestions[index].question + '</h4>');
  qContainer.append(qQuestion);

  var radioButtons = createRadios(index);
  qContainer.append(radioButtons);

  return qContainer;
}

function createRadios(index){
  var choices = $('<ul>');
  var item;
  var input = '';

  for(var i=0; i<allQuestions[index].choices.length; i++){
    item = $('<li>');
    input = '<input type="radio" name="answer" value=' + i + '/>';
    input += allQuestions[index].choices[i];
    item.append(input);
    choices.append(item);
  }
  return choices;
}

function displayNext(){
  $(".qContainer").remove();

  quiz.fadeOut(function(){
    if(questionCounter < allQuestions.length) {
      var nextQuestion = appendQuestion(questionCounter);
      quiz.append(nextQuestion).fadeIn();

      if (questionCounter === 1) {
        prev.show();
        prev.css('display', 'inline-block');
      } else if (questionCounter === 0) {
        next.show();
        next.css('display', 'inline-block');
        prev.hide();
      }
    }else{
      var scoreElement = displayScore();
      quiz.append(scoreElement).fadeIn();
      prev.hide();
      next.hide();
      start.show();
      start.css('display', 'inline-block');
    }

  });
}

//TODO
//Implement showing score.
function displayScore(){
  var score = $('<p>').addClass('qContainer');
  score.append('done');

  return score;
}

function choose(){
  choices[questionCounter] = +$('input[name="answer"]:checked').val();
}

$(document).ready(function(){

  // show first question
  displayNext();
  choose();

  next.on("click", function(e){
    e.preventDefault();

    if ($('input[name="answer"]:checked').length === 0) {
      alert("Please select the answer!");
    } else {
      questionCounter++;
      displayNext();
    }
  });

  //TODO
  //when prev button is clicked, should go back to previous question.

  start.on("click", function(e){
    e.preventDefault();

    questionCounter = 0;
    choices = [];
    displayNext();
    start.hide();
  })
});
