
import React from 'react';
import ReactDOM from "react-dom";
import Board from './Board.js';
import Square from './Square.js';


class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      status: "",
      history: [],
      nextMove: "X",
      squares: Array(9).fill(null)
    }
  }
  restoreState(idx){
    this.setState(this.state.history[idx+1]);
  }
  clickHandler(i){
    let winner = calculateWinner(this.state.squares);
    if (winner || this.state.squares[i]) return;
    let newState = Object.assign({}, this.state);
    newState.squares = Object.assign([], this.state.squares);
    newState.squares[i] = newState.nextMove;
    newState.nextMove = newState.nextMove==="X"?"O":"X";
    winner = calculateWinner(newState.squares);
    if (winner)
      newState.status = "Winner! "+winner;
    else
      newState.status = "Next Move: "+newState.nextMove;
    //newState.history.push(this.state);
    newState.history = this.state.history.concat([this.state]);
    this.setState( newState );
  }
  render() {
    console.log(this.state.history);
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.squares} clickHandler={i=>this.clickHandler(i)}/>
        </div>
        <div className="game-info">
          <div>{this.state.status}</div>
          <ol>
            {this.state.history.map((stateObj,idx)=>(
              <li key={idx} onClick={e=>this.restoreState(idx)}>{JSON.stringify(stateObj.squares)}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
