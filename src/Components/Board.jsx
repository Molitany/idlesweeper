import React, { useState, useEffect } from 'react';
import CreateBoard from '../Utils/CreateBoard';
import Cell from './Cell';
import revealed from '../Utils/Reveal';

function Board(props) {
    const [grid, setGrid] = useState([]);
    const [nonMinecount,setNonMinecount]=useState(0);
    const [mineLocation,setmineLocation]=useState([]);

    const style = {
        display: 'flex',
        flexDirection: 'row',

    }
    useEffect(() => {
        function freshBoard() {
            const newBoard=CreateBoard(10,10,20);
            setNonMinecount(10*10-20);
            
            setmineLocation(newBoard.mineLocation);
            setGrid(newBoard.board);
        }
        freshBoard();
    }, []);

    const updateFlag=(e,x,y)=>{
        e.preventDefault();

        let newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[x][y].flagged=true;
        console.log(newGrid[x][y]);
        setGrid(newGrid);
    }

    const revealCell=(x,y)=>{
        let newGrid=JSON.parse(JSON.stringify(grid));
        if(newGrid[x][y].value==="X"){
            alert("you clicked mine")
            for(let i=0;i<mineLocation.length;i++){
                newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed=true;
            }
            setGrid(newGrid);
        }
        else{
            let revealedboard=revealed(newGrid,x,y,nonMinecount);
            setGrid(revealedboard.arr);
            setNonMinecount(revealedboard.newNonMines);
        }
        
    }

    return (
        <div className="parent">
            <div style={{color:"white",textAlign:"center",fontSize:"35px"}}>Non-Mines : {nonMinecount}</div>
            <div>
                
                {grid.map((singlerow,index1)=>{
                    return (
                        <div style={style} key={index1}>
                            {singlerow.map((singlecol,index2)=>{
                            return  <Cell details={singlecol} key={index2} updateFlag={updateFlag} revealcell={revealCell}/>
                            })}
                        </div>
                    )
                })}
            </div>
          
        </div>
    )
}

export default Board;