window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
   
    // začátek hry
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let herniStav = true;
   
    //konstanty vyherců a podmínek 
    const HRACX_VYHRAL = 'HRACX_VYHRAL';
    const HRACO_VYHRAL = 'HRACO_VYHRAL';    
    const REMIZA = 'REMIZA';

    const vyhrapodminka = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    //funkce pro kontrolu výhry
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const vyhrapod = vyhrapodminka[i];
            const a = board[vyhrapod[0]];
            const b = board[vyhrapod[1]];
            const c = board[vyhrapod[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
    
    if (roundWon) {
            announce(currentPlayer === 'X' ? HRACX_VYHRAL : HRACO_VYHRAL);
            herniStav = false;
            return;
        }

    if (!board.includes(''))
        announce(REMIZA);
    }
    //oznámení výherce
    const announce = (type) => {
        switch(type){
            case HRACX_VYHRAL:
                announcer.innerHTML = 'Hráč <span class="playerX">X</span> Vyhrál!';
                break;
            case HRACO_VYHRAL:
                announcer.innerHTML = 'Hráč <span class="playerO">O</span> Vyhrál!';
                break;
            case REMIZA:
                announcer.innerText = 'Remíza!';
        }
        announcer.classList.remove('hide');
    };
    //hrací pole(nepřepisování)
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }
    //konstanta pro změnu hráče 
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }
    
    const userAction = (tile, index) => {
        if(isValidAction(tile) && herniStav) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    //restartování hry
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        herniStav = true;
        announcer.classList.add('hide');
        //změna hráče
        if (currentPlayer === 'O') {
            changePlayer();
        }
        //odstranění X a O z hracího pole
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }
   //X O při kliknutí
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });
    //tlačítko pro restartování hry
    resetButton.addEventListener('click', resetBoard);
});
