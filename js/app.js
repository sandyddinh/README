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
        question: "What was the quickest grocery store item to sell out in March?",
        answer: [
            ["toilet paper", 37, false],
            ["hand sanitizer", 22, false],
            ["clorox wipes", 15, false],
            ["canned food", 9, false],
            ["pasta", 6, false],
            ["soap", 5, false],
            ["frozen pizza", 4, false],
            ["bottled water", 2, false]
        ]
    },
    {
        question: "What was the best Netflix original?",
        answer: [
            ["Tiger King", 23, false],
            ["Locke & Key", 20, false],
            ["Space Force", 16, false],
            ["Outer Banks", 15, false],
            ["Love is Blind", 14, false],
            ["The Queen's Gambit", 8, false],
            ["Never Have I Ever", 2, false],
            ["Ratched", 2, false]
        ]
    },
    {
        question: "What was the most downloaded iPhone app?",
        answer: [
            ["Zoom", 33, false],
            ["TikTok", 17, false],
            ["Disney Plus", 15, false],
            ["YouTube", 15, false],
            ["Instagram", 10, false],
            ["Facebook", 7, false],
            ["Snapchat", 2, false],
            ["Messenger", 1, false]
        ]
    }
]


$(() => {
    // ---------- Start Game Modal ---------- //
    const $modal = $('#modal');

    const openModal = () => {
        $modal.css('display', 'block'); //display: block to show modal
    }

    openModal();
    // setTimeout(openModal, 100);


    // ---------- Help Modal ---------- //
    const $openHelpBtn = $('#openHelpModal');
    const $help = $('#help');
    const $closeHelpBtn = $('#closeHelpModal');

    const openHelpModal = () => {
        $help.css('display', 'block');
    }

    const closeHelpModal = () => {
        $help.css('display', 'none');
    }

    $openHelpBtn.on('click', openHelpModal);

    $closeHelpBtn.on('click', closeHelpModal);


    // ---------- End Of Game Modal ---------- //
    const $endModal = $('#endModal');
    const $closeEndBtn = $('#closeEndModal');
    const $openStartModal = $('#openStartModal');

    const openEndModal = (winningScore, winningTeam) => {
        $('.winningScore').html(`${winningScore} points`);
        $('.winningTeam').html(`${winningTeam}`);
        $endModal.css('display', 'block');
    }

    const closeEndModal = () => {
        $endModal.css('display', 'none');
    }

    $closeEndBtn.on('click', closeEndModal);
    $openStartModal.on('click', (()=> {
        location.reload();
    }))
    ;


    // ---------- Game ---------- //
    const $startingForm = $('#submit-button');
    const $startRound = $('#start-round');
    // const $currentTeam1 = $('#currentTeam1');
    // const $currentTeam2 = $('#currentTeam2');
    const $question = $('.question');
    const $answerForm = $('#answer-form');
    const $input = $('#answer-box');
    const $points = $('.points');
    const $score1 = $('.score1');
    const $score2 = $('.score2');
    // const $strike1 = $('.strike1');
    // const $strike2 = $('.strike2');
    const $currentTeam = $('.currentTeam');
    let team1 = null;
    let team2 = null;
    let totalPoints = 0;
    let cardSet = 0;
    let answers = [];
    let currentTeam = null;
    let otherTeam = null;
    let roundNum = 1;

    const getAnswerList = () => {
        answers = [];
        for (let i = 0; i < questionCards[cardSet].answer.length; i++){
            answers.push(`${questionCards[cardSet].answer[i][0].toUpperCase()}`);
            $(`.answer${i}`).html(`${questionCards[cardSet].answer[i][0]} [${questionCards[cardSet].answer[i][1]}]`).css('color', '#363537');
            $(`.answer${i}`).hide();
        }

    }

    const clearBoard = () => {
        for (let i = 0; i < 8; i++){
            $(`.answer${i}`).html('');
        }
        // $('.question').html('');
    }

    const endGame = () => {
        let winningScore = null; 
        let winningTeam = null;
        if (team1.points === team2.points){
            winningScore = `${team1.points}`;
            winningTeam = `Both teams win!! (It's a tie!)`
        } else if (team1.points > team2.points) {
            winningScore = `${team1.points}`;
            winningTeam = `${team1.name}`;
        } else {
            winningScore = `${team2.points}`
            winningTeam = `${team2.name}`;
        }
        openEndModal(winningScore, winningTeam);
    }

    const startNewRound = () => {
        roundNum++;
        $('.roundNum').html(`${roundNum}`);
        cardSet ++;
        alert(`Are you ready for a new round to begin?...`)
        const teamHolder = currentTeam;
        currentTeam = otherTeam;
        otherTeam = teamHolder;
        $currentTeam.html(`${currentTeam.name}`);
        totalPoints = 0;
        $points.html(`${totalPoints}`);
        $('.question').html('Click Start Round to begin');
        team1.strikes = 0;
        team2.strikes = 0;
        clearBoard();
        $(`.strike1`).html('');
        $(`.strike2`).html('');
    }

    const checkRound = () => {
        if (roundNum===3){
            endGame();
        }else{
            startNewRound();
        }
    }

    const updateScores = () => {
        if (currentTeam === team1) {
            team1.points += totalPoints;
        } else {
            team2.points += totalPoints;
        }
        $score1.html(`${team1.points}`);
        $score2.html(`${team2.points}`);  
    }

    const showRemainingAnswers = () => {
        for (let i = 0; i < questionCards[cardSet].answer.length; i++){
            if (questionCards[cardSet].answer[i][2] === false)
                $(`.answer${i}`).html(`${questionCards[cardSet].answer[i][0]} [${questionCards[cardSet].answer[i][1]}]`).css('color', '#E37567');
                $(`.answer${i}`).show(2000);
        }
        setTimeout(() => { checkRound() }, 4000);
    }

    const stealPoints = () => {
        const answerToSteal = prompt(`${otherTeam.name}, what is your answer to steal the points?`);
        if (answers.includes(answerToSteal.toUpperCase())){
            const i = answers.indexOf(answerToSteal.toUpperCase());
            $(`.answer${i}`).html(`${questionCards[cardSet].answer[i][0]} [${questionCards[cardSet].answer[i][1]}]`);
            totalPoints += questionCards[cardSet].answer[i][1];
            $points.html(`${totalPoints}`);
            setTimeout(() => { alert(`${otherTeam.name} got the correct answer! ${otherTeam.name} steal the points!`); }, 500);
            otherTeam.points += totalPoints;
        } else {
            alert(`${otherTeam.name} got the incorrect answer! ${currentTeam.name} get the points!`);
            currentTeam.points += totalPoints;
        }
        $score1.html(`${team1.points}`);
        $score2.html(`${team2.points}`); 
        setTimeout(() => { alert(`Are you ready to see the remaining answers?`) }, 1000);
        setTimeout(() => { showRemainingAnswers() }, 1000);
        // showRemainingAnswers();
        // setTimeout(() => { checkRound() }, 1000);
    }

    const checkStrikes = () =>{
        if (currentTeam.strikes === 3){
            alert(`${currentTeam.name} has 3 strikes! ${otherTeam.name} has a chance to steal the points!`);
            stealPoints();
        }
    }



    const isRoundOver = () => {
        let trueCount = 0;
        for (let i = 0; i < questionCards[cardSet].answer.length; i++){
            if (questionCards[cardSet].answer[i][2]){
                trueCount++;
            } 
        }
        if (trueCount === 8){
            updateScores();
            setTimeout(() => { alert(`Round ${roundNum} is over. ${currentTeam.name} take the points!`) }, 1000);
            setTimeout(() => { alert(`Are you ready to see the remaining answers?`) }, 1000);
            showRemainingAnswers();
            
        }
    }

    const checkAnswer = (teamNum, input) => {
        if (answers.includes(input)){
            const i = answers.indexOf(input);
            questionCards[cardSet].answer[i][2] = true;
            $(`.answer${i}`).show(1000);
            // $(`.answer${i}`).html(`${questionCards[cardSet].answer[i][0]} [${questionCards[cardSet].answer[i][1]}]`);
            totalPoints += questionCards[cardSet].answer[i][1];
            $points.html(`${totalPoints}`);
            isRoundOver();
        }else{
            let $strikes = $(`.strike${teamNum}`).text();
            currentTeam.addStrike();
            $(`.strike${teamNum}`).html(`${$strikes} X`);
            alert (`Answer not on the board! ${currentTeam.name} get a strike. :( `);
            setTimeout(() => { checkStrikes() }, 500);
        }
    }

    $startRound.on('click', (event) => {
        event.preventDefault();
        $question.html(`We asked 100 people, ${questionCards[cardSet].question}`);
        getAnswerList();
    })

    const answer = $answerForm.on('submit', (event) => {
        event.preventDefault();
        checkAnswer(currentTeam.number, $input.val().toUpperCase());
        $(event.currentTarget).trigger('reset');
    })

    const pickTeamToStart = () => {
        const randomTeamNum = Math.floor(Math.random() * 2) + 1;
        let otherTeamNum = null;
        randomTeamNum === 1 ? (otherTeamNum = 2) : (otherTeamNum = 1);
        currentTeam = eval(`team${randomTeamNum}`);
        otherTeam = eval(`team${otherTeamNum}`);
        $currentTeam.html(`${currentTeam.name} &nbsp`);
    }

    const makeTeams = () => {
        team1 = new Team (1, $('#team1-name-box').val(), $('#team1-player1-box').val(), $('#team1-player2-box').val(), $('#team1-player3-box').val()) 
        team2 = new Team (2, $('#team2-name-box').val(), $('#team2-player1-box').val(), $('#team2-player2-box').val(), $('#team2-player3-box').val()) 
        $('.teamName1').html(`${team1.name}`);
        $('.teamName2').html(`${team2.name}`);
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
    })

})