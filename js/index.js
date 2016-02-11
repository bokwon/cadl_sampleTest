/**
 * Created by boyoung on 2/5/16.
 */

var allQuestions = [
  {question: "When you drive through a construction zone, you should:",
  choices: ["Slow down to watch the worker.", "Decrease your following distance.", "Pass the construction zone carefully and not 'rubberneck'."],
  correctAnswer:2},
  {question: "To make a right turn at the corner, you:",
  choices: ["May not enter the bicycle lane.", "Should only merge into the bicycle lane if you stop before turning.", "Must merge into the bicycle lane before turning."],
  correctAnswer:2},
  {question: "If a traffic signal light is now working, you must:",
  choices: ["Stop, then proceed when safe", "Stop before entering the intersection and let all other traffic go first.", "Slow down or stop, only if necessary."],
  correctAnswer:0},
  {question: "A pedestrian is crossing your lane but there is no marked crosswalk. You should",
  choices: ["Make sure the pedestrian sees you, but continue driving", "Carefully drive around the pedestrian", "Stop and let the pedestrian cross the street."],
  correctAnswer:2},
  {question: "Always use your seat belt:",
  choices: ["Unless the vehicle was built before 1978", "Unless you are in a limousine", "When the vehicle is equipped with seat belts"],
  answer:2},
  {question: "The extra space in front of a large truck is needed for",
  choices: ["Other drivers when merging onto a freeway", "The truck driver to stop the vehicle.", "Other drivers when they want to slow down"],
  answer:1},
  {question: "Roads are slippery after it first starts to rain. When the road is slippery you should:",
  choices: ["Avoid making fast turns and fast stops", "Test your tires traction while going uphill", "Decrease the distance you look ahead of your vehicle."],
  answer:0},
  {question: "Collisions can happen more often when",
  choices: ["All vehicles are traveling about the same speed.", "One lane of traffic is traveling faster than the other lane.", "One vehicle is traveling faster or slower than the flow of the traffic."],
  answer:2}
];

var questionCounter = 0;
var selections = [];
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
    input = '<input type="radio" name="answer" value=' + i + ' />';
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
      if(selections[questionCounter] !== undefined){
        $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
      }

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

function displayScore(){
  var score = $('<p>').addClass('qContainer');
  var correct = 0;
  for(var i=0; i < selections.length; i++){
    if(selections[i] === allQuestions[i].correctAnswer){
      correct++;
    }
  }

  score.append('You have answered ' + correct + ' questions correctly out of ' + selections.length + ' questions!');
  return score;
}

function choose(){
  selections[questionCounter] = +$('input[name="answer"]:checked').val();
}

$(document).ready(function(){

  // show first question
  displayNext();

  next.on("click", function(e){
    e.preventDefault();

    if ($('input[name="answer"]:checked').length === 0) {
      alert("Please select the answer!");
    } else {
      choose();
      questionCounter++;
      displayNext();
    }
  });

  prev.on("click", function(){
    questionCounter--;
    displayNext();
  });

  start.on("click", function(e){
    e.preventDefault();

    questionCounter = 0;
    selections = [];
    displayNext();
    start.hide();
  })
});
