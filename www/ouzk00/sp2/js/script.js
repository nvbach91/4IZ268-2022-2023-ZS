$(document).ready(function () {
  let i = 0;
  $.get(
    "https://the-trivia-api.com/api/questions?limit=5&difficulty=easy",
    function (quizQuestion) {
      let allAnswers = [
        quizQuestion[i].correctAnswer,
        quizQuestion[i].incorrectAnswers[0],
        quizQuestion[i].incorrectAnswers[1],
        quizQuestion[i].incorrectAnswers[2],
      ];
      //promíchání položek uvnitř array (není úplně ideální způsob, nejspíš změním):
      allAnswers.sort(() => 0.5 - Math.random());
      $(".quiz-question").html(`${quizQuestion[i].question}`);
      $(".quiz-answer-1").html(`${allAnswers[0]}`);
      $(".quiz-answer-2").html(`${allAnswers[1]}`);
      $(".quiz-answer-3").html(`${allAnswers[2]}`);
      $(".quiz-answer-4").html(`${allAnswers[3]}`);

      let correct = quizQuestion[i].correctAnswer;

      $(":button").click(function () {
        if (event.target.innerText == `${correct}`) {
          $("body").append('<h3 class="response">Correct!</h3>');
          $("body").append('<button class="next">Next question</button');
          $(".next").click(function () {
            $(".response").remove();
            $(".next").remove();
            location.reload();
          });
        } else {
          $("body").empty();
          $("body").append('<h3 class="response">Game over</h3>');
        }
      });
    }
  );
});
