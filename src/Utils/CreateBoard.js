export default function CreateBoard(row, col, bombs) {
    let board = []
    let mines = []
    let curBombs = 0

    for (let x = 0; x < row; x++) {
        let subCol = []
        for (let y = 0; y < col; y++) {
            subCol.push({
                x: x,
                y: y,
                value: 0,
                revealed: false,
                flagged: false
            })
        }
        board.push(subCol)
    }

    while (curBombs < bombs) {
        let x = Math.floor(Math.random() * row)
        let y = Math.floor(Math.random() * col)

        if (board[x][y].value === 0) {
            board[x][y].value = 'X'
            mines.push([x, y])
            curBombs++
        }
    }

    mines.forEach(minePos => {
        for (let x = -1; x <= 1; x++){
            for (let y = -1; y <= 1; y++){
                if (board[minePos[0]+x] !== undefined && board[minePos[0]+x][minePos[1]+y] !== undefined && board[minePos[0]+x][minePos[1]+y].value !== 'X' && (x !== 0 || y !== 0)){
                    board[minePos[0]+x][minePos[1]+y].value++
                }
            }
        }
    })

    return {board, mines}
}