class Team {
    constructor(num, name, player1, player2, player3){
        this.number = num;
        this.name = name;
        this.players = [player1, player2, player3];
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

// const team1 = new Team(1, 'Ladies', 'sandy', 'tina', 'judy');
// const team2 = new Team(2, 'Gents', 'matt', 'winston', 'apollo');
// console.log(team1);
// console.log(team2);

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
    // ---------- Modal ---------- //
    const $modal = $('#modal');

    const openModal = () => {
    $modal.css('display', 'block');
    }
    setTimeout(openModal, 1000);

    // ---------- Game ---------- //
    const $startingForm = $('#submit-button');
    const $startRound = $('#start-round');
    const $currentTeam1 = $('#currentTeam1');
    const $currentTeam2 = $('#currentTeam2');
    const $question = $('.question');
    const $answerForm = $('#answer-form');
    const $input = $('#answer-box');
    const $points = $('.points');
    const $score1 = $('.score1');
    const $score2 = $('.score2');
    const $strike1 = $('.strike1');
    const $strike2 = $('.strike2');
    const $currentTeam = $('.currentTeam');
    let totalPoints = 0;
    let cardSet = 0;
    let answers = [];
    var currentTeam = null;
    var otherTeam = null;


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

    const checkStrikes = () =>{
        if (currentTeam.strikes === 3){
            alert(`Team ${currentTeam.name} has 3 strikes! Team ${otherTeam.name} has a chance to steal the points!`);
            let teamHolder = currentTeam;
            currentTeam = otherTeam;
            otherTeam = teamHolder;
            $currentTeam.html(`Team ${currentTeam.name}`);
            // answer();
        }
    }

    const checkAnswer = (teamNum, input) => {
        if (answers.includes(input)){
            const i = answers.indexOf(input);
            $(`.answer${i+1}`).html(`${questionCards[cardSet].answer[i][0]}`);
            totalPoints += questionCards[cardSet].answer[i][1];
            $points.html(`${totalPoints}`);
        }else{
            currentTeam.addStrike();
            alert (`Answer not on the board! Team ${currentTeam.name} gets a strike. Total strikes: ${currentTeam.strikes}`);
            $(`.strike${teamNum}`).html(`${currentTeam.strikes}`);
            checkStrikes();
        }
    }


    $startRound.on('click', (event) => {
        event.preventDefault();
        $question.html(`${questionCards[cardSet].question}`);
        
    })

    const answer = $answerForm.on('submit', (event) => {
        event.preventDefault();
        checkAnswer(currentTeam.number, $input.val());
        console.log(`answered! currentTeam is ${currentTeam.number} ${currentTeam.name}`)
    })


    $startingForm.on('click', (event) => {
        event.preventDefault();
        console.log(`started the form`)
        const team1 = new Team (1, $('#team1-name-box').val(), $('#team1-player1-box').val(), $('#team1-player2-box').val(), $('#team1-player3-box').val()) 
        const team2 = new Team (2, $('#team2-name-box').val(), $('#team2-player1-box').val(), $('#team2-player2-box').val(), $('#team2-player3-box').val()) 
        console.log(team1);
        console.log(team2);
        $('.teamName1').html(`Team ${team1.name}`);
        $('.teamName2').html(`Team ${team2.name}`);
        for(let i = 0; i < team1.players.length; i++){
            const $li1 = $('<li>').text(team1.players[i]);
            const $li2 = $('<li>').text(team2.players[i]);
            $('#team1Players').append($li1);
            $('#team2Players').append($li2);
        }
        $modal.css('display', 'none');
        const randomTeamNum = Math.floor(Math.random() * 2) + 1;
        let otherTeamNum = null;
        randomTeamNum === 1 ? (otherTeamNum = 2) : (otherTeamNum = 1);
        currentTeam = eval(`team${randomTeamNum}`);
        otherTeam = eval(`team${otherTeamNum}`);
        $currentTeam.html(`Team ${currentTeam.name}`);
        console.log(`random team number is ${randomTeamNum} and current team is ${currentTeam.name} and other team is ${otherTeam.name} `)
    })

})