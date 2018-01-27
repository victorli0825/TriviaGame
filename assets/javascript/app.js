var questions = [{
  question:  "Who was the first NBA player that retired two different numbers of jerseys at the same time in one team?",
  answer: ["Michael Jordan", "'Magic' Johnson", "Kobe Bryant", "Shaquille O'Neal"],
  correctAnswer: "Kobe Bryant",
}, {
  question:  "Who won the FMVP award in 2014-15 season when Golden State Warriors beated Cleveland Cavaliers?",
  answer: ["Stephen Curry", "LeBrown James", "Klay Thompson", "Andre Iguodala"],
  correctAnswer: "Andre Iguodala",
}, {
  question:  "Which team recorded the longest winning steaks in NBA history?",
  answer: ["Golden State Warriors", "Los Angeles Lakers", "Houston Rockets", "Miami Heat"],
  correctAnswer: "Los Angeles Lakers",
}, {
  question:  "Which team recorded the most games won in a regular season in NBA history?",
  answer: ["Golden State Warriors", "Los Angeles Lakers", "Chicago Bulls", "Boston Celtics"],
  correctAnswer: "Golden State Warriors",
}, {
  question:  "Which team made the most 3 points shooting in 2016-17 NBA season?",
  answer: ["Golden State Warriors", "Cleveland Cavaliers", "Houston Rockets", "Oklahoma City Thunder"],
  correctAnswer: "Houston Rockets",
}, {
  question:  "Who made the most free throws in 2016-17 NBA season?",
  answer: ["James Harden", "Kevin Durant", "Russell Westbrook", "Giannis Antetokounmpo"],
  correctAnswer: "James Harden",
}, {
  question:  "Which team and city host the All Star Game in 2000?",
  answer: ["Golden State Warriors and Oakland", "Los Angeles Lakers and Los Angeles", "New York Knicks and New York", "no team and Lav Vegas"],
  correctAnswer: "Golden State Warriors and Oakland",
}, {
  question:  "Which team won the most NBA Champions in entire history?",
  answer: ["Chicago Bulls", "Los Angeles Lakers", "San Antonio Spurs", "Boston Celtics"],
  correctAnswer: "Boston Celtics",
}];

// var panel = $('#questions');
// var countNumber = 30;

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#time-remaining').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.startGames();
});

var panel = $('#questions');
var countNumber = 30;


var game = {
  questions:questions,
  currentQuestion:0,
  correctAnswer:0,
  incorrectAnswer:0,
  counter:countNumber,

  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      game.timeUp();
    }
  },



  startGames: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i < questions[this.currentQuestion].answer.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answer[i] + '">' + questions[this.currentQuestion].answer[i]+ '</button>');
    }
  },

  continueGames: function(){
    game.counter = countNumber;
    game.currentQuestion++;
    $('#counter-number').html(game.counter);
    game.startGames();
  },

  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);
    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } 
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {
    clearInterval(timer);

    // panel.html('<h2>All done!</h2>');
    $('#counter-number').html(game.counter);
    panel.html('<h2>All done!</h2>');
    panel.append('<h3>Correct Answers: ' + game.correctAnswer + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrectAnswer + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.correctAnswer + game.incorrectAnswer)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over</button>');
  },

  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    } 
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrectAnswer++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } 
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function(){
    clearInterval(timer);
    game.correctAnswer++;
    panel.html('<h2>Correct!</h2>');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } 
    else {
      setTimeout(game.continueGames, 3 * 1000);
    }
  },

  reset: function(){
  	this.counter = countNumber;
    this.currentQuestion = 0;
    this.correctAnswer = 0;
    this.incorrectAnswer = 0;
    this.startGames();
  }
};



