import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponents from "./commponents/BoardComponents";
import {Board} from "./models/Board";
import {Colors} from "./models/Colors";
import {Player} from "./models/Player";
import LostFigurs from "./commponents/LostFigurs";

function App() {

    const [board, setBoard] = useState(new Board());
    const [WhitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [BlackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);


    useEffect(() => {
        restart()
        setCurrentPlayer(WhitePlayer)
    }, [])

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? BlackPlayer : WhitePlayer)
    }

    function restart(){
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard);
    }

  return (
      <>
          <h3>Текущий игрок {currentPlayer?.color}</h3>
          <div className="App">
              <BoardComponents
                  board={board}
                  setBoard={setBoard}
                  currentPlayer={currentPlayer}
                  swapPlayer={swapPlayer}
              />
              <div className="tableFigure">
                  <LostFigurs title={"черные фигуры"} figures={board.lostBlackFigurs}/>
                  <LostFigurs title={"белые фигуры"} figures={board.lostWhiteFigurs}/>
              </div>
          </div>

      </>

  );
}

export default App;
