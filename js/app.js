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
    },
    {
        question: "What is the most popular song of 2020?",
        answer: [
            ["a", 45],
            ["b", 30],
            ["c", 25],
            ["d", 23],
            ["e", 17],
            ["f", 15],
            ["g", 10],
            ["h", 8]
        ]
    },
    {
        question: "What is the most popular movie of 2020?",
        answer: [
            ["1", 45],
            ["2", 30],
            ["3", 25],
            ["4", 23],
            ["5", 17],
            ["6", 15],
            ["7", 10],
            ["8", 8]
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
    let team1 = null;
    let team2 = null;
    let totalPoints = 0;
    let cardSet = 0;
    let answers = [];
    let currentTeam = null;
    let otherTeam = null;
    let roundNum = 1;


    // TO DO: Use MAP??
    const getAnswerList = () => {
        for (let i = 0; i < questionCards[cardSet].answer.length; i++){
            answers.push(`${questionCards[cardSet].answer[i][0]}`);
        }
    }

    const endGame = () => {
        if (team1.points === team2.points){
            alert(`3 rounds are over and it's a tie with a total of ${team1.points} points!!`)
        } else if (team1.points > team2.points) {
            alert(`3 rounds are over. With a total of ${team1.points} points, the winner is.......... ${team1.name} !!!`)
        } else {
            alert(`3 rounds are over. With a total of ${team2.points} points, the winner is.......... ${team2.name} !!!`)
        }
        
    }

    const startNewRound = () => {
        roundNum++;
        $('.roundNum').html(`${roundNum}`);
        cardSet ++;
        alert(`New Round is about to begin...`)
        const teamHolder = currentTeam;
        currentTeam = otherTeam;
        otherTeam = teamHolder;
        $currentTeam.html(`Team ${currentTeam.name}`);
        totalPoints = 0;
        $points.html(`${totalPoints}`);
        team1.strikes = 0;
        team2.strikes = 0;
    }

    const updateScores = () => {
        $score1.html(`${team1.points}`);
        $score2.html(`${team2.points}`);
        if (roundNum===3){
            endGame();
        }else{
            startNewRound();
        }
    }

    const stealPoints = () => {
        const answerToSteal = prompt(`${otherTeam.name}, what is your answer to steal the points?`);
        if (answers.includes(answerToSteal)){
            const i = answers.indexOf(answerToSteal);
            $(`.answer${i+1}`).html(`${questionCards[cardSet].answer[i][0]}`);
            totalPoints += questionCards[cardSet].answer[i][1];
            $points.html(`${totalPoints}`);
            alert(`${otherTeam.name} got the correct answer! ${otherTeam.name} steals the points!`);
            otherTeam.points += totalPoints;
        } else {
            alert(`${otherTeam.name} got the incorrect answer! ${current.name} gets the points!`);
            currentTeam.points += totalPoints;
        }
        updateScores();
    }

    const checkStrikes = () =>{
        if (currentTeam.strikes === 3){
            alert(`Team ${currentTeam.name} has 3 strikes! Team ${otherTeam.name} has a chance to steal the points!`);
            stealPoints();
        }
    }

    const isRoundOver = () => {
        if (answers===[]){
            alert(`Round ${roundNum} is over. ${currentTeam.name} takes the points!`)
            updateScores();
        } 
    }
    
    const checkAnswer = (teamNum, input) => {
        if (answers.includes(input)){
            const i = answers.indexOf(input);
            answers.splice(i, 1);
            $(`.answer${i+1}`).html(`${questionCards[cardSet].answer[i][0]}`);
            totalPoints += questionCards[cardSet].answer[i][1];
            $points.html(`${totalPoints}`);
            isRoundOver();
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
        getAnswerList();
    })

    const answer = $answerForm.on('submit', (event) => {
        event.preventDefault();
        checkAnswer(currentTeam.number, $input.val());
        $(event.currentTarget).trigger('reset');
    })

    const pickTeamToStart = () => {
        const randomTeamNum = Math.floor(Math.random() * 2) + 1;
        let otherTeamNum = null;
        randomTeamNum === 1 ? (otherTeamNum = 2) : (otherTeamNum = 1);
        currentTeam = eval(`team${randomTeamNum}`);
        otherTeam = eval(`team${otherTeamNum}`);
        $currentTeam.html(`Team ${currentTeam.name}`);
    }

    const makeTeams = () => {
        team1 = new Team (1, $('#team1-name-box').val(), $('#team1-player1-box').val(), $('#team1-player2-box').val(), $('#team1-player3-box').val()) 
        team2 = new Team (2, $('#team2-name-box').val(), $('#team2-player1-box').val(), $('#team2-player2-box').val(), $('#team2-player3-box').val()) 
        $('.teamName1').html(`Team ${team1.name}`);
        $('.teamName2').html(`Team ${team2.name}`);
        for(let i = 0; i < team1.players.length; i++){
            const $li1 = $('<li>').text(team1.players[i]);
            const $li2 = $('<li>').text(team2.players[i]);
            $('#team1Players').append($li1);
            $('#team2Players').append($li2);
        }
    }

    $startingForm.on('click', (event) => {
        event.preventDefault();
        makeTeams();
        $modal.css('display', 'none');
        $('.roundNum').html(`${roundNum}`);
        pickTeamToStart();
        getAnswerList();
    })

})