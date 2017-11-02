const player = 'o', opponent = 'x';

// This function returns true if there are moves
// remaining on the board. It returns false if
// there are no moves left to play.
function isMovesLeft(board) {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[i][j] === undefined)
                return true;
    return false;
}

// This is the evaluation function as discussed
// in the previous article ( http://goo.gl/sJgv68 )
function evaluate(b) {
    // Checking for Rows for X or O victory.
    for (let row = 0; row < 3; row++) {
        if (b[row][0] === b[row][1] &&
            b[row][1] === b[row][2]) {
            if (b[row][0] === player)
                return +10;
            else if (b[row][0] === opponent)
                return -10;
        }
    }

    // Checking for Columns for X or O victory.
    for (let col = 0; col < 3; col++) {
        if (b[0][col] === b[1][col] &&
            b[1][col] === b[2][col]) {
            if (b[0][col] === player)
                return +10;

            else if (b[0][col] === opponent)
                return -10;
        }
    }

    // Checking for Diagonals for X or O victory.
    if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
        if (b[0][0] === player)
            return +10;
        else if (b[0][0] === opponent)
            return -10;
    }

    if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
        if (b[0][2] === player)
            return +10;
        else if (b[0][2] === opponent)
            return -10;
    }

    // Else if none of them have won then return 0
    return 0;
}


function minimax(board, depth, isMax) {
    let score = evaluate(board);

    // If Maximizer has won the game return his/her
    // evaluated score
    if (score === 10)
        return score;

    // If Minimizer has won the game return his/her
    // evaluated score
    if (score === -10)
        return score;

    // If there are no more moves and no winner then
    // it is a tie
    if (isMovesLeft(board) === false)
        return 0;

    // If this maximizer's move
    if (isMax) {
        let best = -1000;

        // Traverse all cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Check if cell is empty
                if (board[i][j] === undefined) {
                    // Make the move
                    board[i][j] = player;

                    // Call minimax recursively and choose
                    // the maximum value
                    best = Math.max(best,
                        minimax(board, depth + 1, !isMax));

                    // Undo the move
                    board[i][j] = undefined;
                }
            }
        }
        return best;
    }

    // If this minimizer's move
    else {
        let best = 1000;

        // Traverse all cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Check if cell is empty
                if (board[i][j] === undefined) {
                    // Make the move
                    board[i][j] = opponent;

                    // Call minimax recursively and choose
                    // the minimum value
                    best = Math.min(best,
                        minimax(board, depth + 1, !isMax));

                    // Undo the move
                    board[i][j] = undefined;
                }
            }
        }
        return best;
    }
}


export function findBestMove(board) {
    let bestVal = -1000;
    const bestMove = {};
    bestMove.row = -1;
    bestMove.col = -1;

    // Traverse all cells, evaluate minimax function for
    // all empty cells. And return the cell with optimal
    // value.
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Check if celll is empty
            if (board[i][j] === undefined) {
                // Make the move
                board[i][j] = player;

                // compute evaluation function for this
                // move.
                let moveVal = minimax(board, 0, false);

                // Undo the move
                board[i][j] = undefined;

                // If the value of the current move is
                // more than the best value, then update
                // best/
                if (moveVal > bestVal) {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }

    console.log("The value of the best Move is : d",
        bestVal);

    return bestMove;
}

export function isWin(board, currentSymbol) {
    let isWin = true;
    // Diagonal check: top-left to bottom-right
    for (let i = 0; i < 3; i++) {
        isWin = isWin && (board[i][i] === currentSymbol);
    }
    if (isWin)
        return isWin;

    isWin = true;
    // Diagonal check: top-right to bottom-left
    for (let i = 0, j = 2; i < 3; i++, j--) {
        isWin = isWin && (board[i][j] === currentSymbol);
    }
    if (isWin)
        return isWin;

    // row major check
    for (let i = 0; i < 3; i++) {
        isWin = true;
        for (let j = 0; j < 3; j++) {
            isWin = isWin && (board[i][j] === currentSymbol);
        }
        if (isWin)
            return isWin;
    }

    //column major check
    for (let i = 0; i < 3; i++) {
        isWin = true;
        for (let j = 0; j < 3; j++) {
            console.log(j);
            console.log(i);
            console.log(board[j][i]);
            console.log('=================');
            console.log('=================');
            isWin = isWin && (board[j][i] === currentSymbol);
        }
        if (isWin)
            return isWin;
    }

    console.log(isWin);

    return isWin;
}