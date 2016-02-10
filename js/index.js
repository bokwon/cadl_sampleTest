/**
 * Created by boyoung on 2/5/16.
 */
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

$(document).ready(function(){

  // show first question
  for(key in allQuestions[0]){
    if(key === "question"){
      $("#quiz h4").prepend("Q1: " + allQuestions[0][key]);
    }else if(key === "choices"){
      for(var i=0; i<allQuestions[0][key].length; i++){
        $("#quiz ul").append("<li><input type='radio' name='answer' value='" + i + "'>" + allQuestions[0][key][i] + "</li>");
      }
    }
  }



});

