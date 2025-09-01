import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponents from "./CellComponents";
import {Cell} from "../models/Cell";
import {Figure} from "../models/figures/Figure";
import {Player} from "../models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponents: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
            updateBoard()
        }else{
            if (cell.figure?.color === currentPlayer?.color){
                setSelectedCell(cell);
            }
        }
    }

    useEffect(()=>{
        highlightCells()
    }, [selectedCell]);

    function highlightCells(){
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div className="board">
            {board.cells.map((row, index) => (
              <React.Fragment key={index}>
                  {row.map(cells =>
                    <CellComponents
                        click={click}
                        cell={cells}
                        key={index}
                        selected={cells.x === selectedCell?.x && cells.y === selectedCell?.y}
                    />
                  )}
              </React.Fragment>
            ))}
        </div>
    );
};

export default BoardComponents;