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
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  // Immutability using 'slice' method
  // 1. Complex Features Become Simple
  // 2. Detecting Changes
  // 3. Determing When to Re-Render in React
  handleClick(i) {
    const squares = this.state.squares.slice(); // copy of existing 'squares' array
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
       />); // passing props to child component
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

// Over React v18.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);


