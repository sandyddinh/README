class Team {
    constructor(teamName, player1, player2, player3){
        this.teamName = teamName;
        this.player1 = player1;
        this.player2 = player2;
        this.player4 = player3;
        this.points = 0;
        this.strikes = 0;
    }
    play() {
        submitAnswer();
    }
    addPoints() {
        this.points += totalPoints;
    }
    addStrike() {
        this.strikes++;
    }
}

const team1 = new Team('Team Uno', 'sandy', 'tina', 'judy');
const team2 = new Team('Team Dos', 'matt', 'winston', 'apollo');
console.log(team1);
console.log(team2);

const questionCards = [
    {
        question: "What is the most popular tv show of 2020?",
        answer: [
            ["Queens Gambit", 45],
            ["The Undoing", 30],
            ["The Last Dance", 25],
            ["The Bachelor", 23],
            ["The Crown", 17],
            ["This is Us", 15],
            ["Emily in Paris", 10],
            ["Grey's Anatomy", 8]
        ]
    }
]


$(() => {
    const $startRound = $('#start-round');
    const $question = $('.question');
    const $form = $('form');
    const $input = $('#answer-box');
    const $points = $('.points');
    const $score1 = $('.score1');
    const $score2 = $('.score2');
    const $strike1 = $('.strike1');
    const $strike2 = $('.strike2');
    const $answer1 = $('.answer1');
    const $answer2 = $('.answer2');
    const $answer3 = $('.answer3');
    const $answer4 = $('.answer4');
    const $answer5 = $('.answer5');
    const $answer6 = $('.answer6');
    const $answer7 = $('.answer7');
    const $answer8 = $('.answer8');
    let totalPoints = 0;
    let cardSet = 0;
    let answers = [];



    // TO DO: add as a function or use MAP??
    for (let i = 0; i < questionCards[cardSet].answer.length; i++){
        answers.push(`${questionCards[cardSet].answer[i][0]}`);
    }

    // const getAnswers = () => {
    //     for (let i = 0; i < questionCards[cardSet].answer.length; i++){
    //         answers.push(`${questionCards[cardSet].answer[i][0]}`);
    //     }
    // }
    console.log(answers);

    const checkAnswer = (teamNum, input) => {
        const team = eval(`team${teamNum}`);
        if (answers.includes(input)){
            const i = answers.indexOf(input);
            $(`.answer${i+1}`).html(`${questionCards[cardSet].answer[i][0]}`);
            totalPoints += questionCards[cardSet].answer[i][1];
            $points.html(`${totalPoints}`);
        }else{
            alert ('Answer not on the board! You get a strike.');
            team.addStrike();
            $(`.strike${teamNum}`).html(`${team.strikes}`);
        }
    }

    $startRound.on('click', (event) => {
        event.preventDefault();
        $question.html(`${questionCards[cardSet].question}`);

    })

    const team1Answer = $form.on('submit', (event) => {
        event.preventDefault();
        checkAnswer(1, $input.val());
    })
})