const turnMark = document.getElementById('turn')
const cells = document.querySelectorAll('.cell')
const results = document.getElementById('results')
const winner = document.getElementById('winner')
const newGame = document.getElementById('new-game')


let turn = 'X';
let isGameOver = false;
let isTie = false;

cells.forEach(event => {
    event.addEventListener('click', ()=> {
        if (event.innerHTML === '' && !isGameOver) {
            event.innerHTML = turn;
            checkWin();
            checkTie();
            changeTurn();
        }
    })    
})  

newGame.addEventListener('click', event => {
    event.preventDefault();
    startNewGame();
}
)

function changeTurn() {
    if (turn === 'X') {
        turn = 'O';
        turnMark.classList.add('changed')
    } else {
        turn = 'X';
        turnMark.classList.remove('changed')
    }
}

function checkWin() {
    const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (let i=0; i<winningCombos.length; i++) {
        if (cells[winningCombos[i][0]].innerHTML === turn && 
            cells[winningCombos[i][1]].innerHTML === turn &&
            cells[winningCombos[i][2]].innerHTML === turn) {
                isGameOver = true
                winner.innerHTML = `Winner is ${turn} !`
                results.classList.remove('hidden')
                cells[winningCombos[i][0]].classList.add('highlight')
                cells[winningCombos[i][1]].classList.add('highlight')
                cells[winningCombos[i][2]].classList.add('highlight')
        }
    }
}

function checkTie() {
    if (!isGameOver) {
       isTie = true; 
       cells.forEach(event => {
            if  (event.innerHTML === '') {
                isTie = false
            }
        })
        if (isTie) {
            isGameOver = true;
            results.classList.remove('hidden')
            winner.innerHTML = `Tie !`
        } 
    }       
}

function startNewGame() {
    turn = 'X'
    isGameOver = false
    isTie = false
    cells.forEach(event => {
        event.innerHTML = ''
        event.classList.remove('highlight')
        turnMark.classList.remove('changed')
        results.classList.add('hidden')
    })
}