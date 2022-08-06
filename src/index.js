import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Square component renders a single <button>.
function Square(props) { // As of lifting state up, Square components are now 'controlled components'.
  // constructor(props) {
  //   super(props); // 부모 클래스의 생성자(constructor)에 넘겨줄 매개변수가 있는 경우, super()를 써서 부모 클래스의 생성자를 매개변수로 넘겨준다.    
  //   this.state = { // React components can have 'state(got clicked and filled it with an "X" mark)' by setting 'this.state' in their constructors.
  //     value: null,
  //   }; 
  // }

  return (
    <button 
      className="square"
      onClick={props.onClick}
      // By calling 'this.setState' from an 'onClick' handler in the Square’s 'render()' method, 
      // we tell React to re-render that Square whenever its <button> is clicked.
    >
      {/* Receiving data from parent component */}
      {props.value}
      
    </button>
  );
}


// Board component renders 9 squares.
class Board extends React.Component {
  
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.handleClick(i)}
       />); // passing props to child component
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}



// Game component renders a board with placeholder values.
class Game extends React.Component {
  constructor(props) { // Game 컴포넌트의 생성자 안에 초기 state 설정
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0, // 현재 사용자에게 표시되는 이동을 반영
      xIsNext: true,
    }
  }

    // Immutability using 'slice' method
    // 1. Complex Features Become Simple
    // 2. Detecting Changes
    // 3. Determing When to Re-Render in React
  handleClick(i) {
    // 아래 history는 '시간을 되돌려' 그 시점에서 새로운 움직임을 보이면, 
    // 지금은 올바르지 않은 '미래'의 기록을 모두 버리는 것을 보장한다.
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber]; // 마지막 이동을 렌더링하는 대신 'stepNumber'에 맞는 현재 선택된 이동을 렌더링한다.
    const squares = this.state.squares.slice(); // copy of existing 'squares' array
    if (calculateWinner(squares) || squares[i]) { // Ignore a click if someone has won the game or if a Square is already filled.
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) { // state의 history 프로퍼티를 업데이트 하지 않았다!
    this.setState({
      stepNumber: step, // 현재 사용자에게 표시되는 이동을 반영
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    // 과거의 이동으로 '돌아가는' 버튼 목록
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        // It's strongly recommended that you assign proper keys whenever you build dynamic lists.
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = `Winner ${winner}`;
    } else {
      status = `Next player: ${(this.state.xIsNext) ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


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
// ========================================

// Over React v18.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);


