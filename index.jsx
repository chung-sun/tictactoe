const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);
  // let status = `Winner is ${checkForWinner(gameState)}`;
  // 0 = Player O, 1 = Player X, 2 = No Winner Yet
  const checkWinner = checkForWinner(gameState);
  
  let status = `Winner is ${checkWinner === 2 ? 'No Winner Yet' : (checkWinner === 0 ? 'Player O' : 'Player X')}`;
  
  // Use conditional logic to set a variable to either 'Player O' or  'Player X'
  let playerStatus = `Next Player: Player ${player == 0 ? 'O' : 'X'}`;
  console.log(`Next Player: ${player}`);
  console.log(`We hav a winner ${status}`);
  console.log(`GameState: ${checkWinner}`);

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2);
    return player;
  };

  function renderSquare(i) {
    return <Square takeTurn={takeTurn} id={i} checkWinner={checkWinner}></Square>;
  }

  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1 id='turn'>{playerStatus}</h1>
        <h1>{status}</h1>
        {/* future improvement will use the useEffect */}
        <button id="start-game" disabled={false} onClick={() => window.location.reload(false)}>Start Game</button>
      </div>
    </div>
      );
};

const Square = ({ takeTurn, id, checkWinner }) => {
  const mark = ['O', 'X', '+'];
  const col = ['white', 'red', ''];
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(2);

  const handleClick = () => {
    let tikVal = takeTurn(id);
    setTik(tikVal);
    let filledVal = true;
    setFilled(filledVal);
    console.log('tik : ', tikVal);
    console.log(`Square: ${id} filled by player : ${takeTurn(id)} and checkWinner ${JSON.stringify(checkWinner)}`);
  }
  
  return (
    <button
      // add css className according to the player 'white' or 'red' for 0 or 1
      className={tik == 0 ? `${col[tik]}` : `${col[tik]}`}
      // disable button if the square has been filled
      disabled={filled ? true : false}
      onClick={ handleClick }
    >
      <h1>{mark[tik]}</h1>
    </button>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

const win = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

const checkPlayerTurn = (gameState) => {
  return gameState.player;
};

const checkForWinner = (gameState) => {
  // 0 = Player O, 1 = Player X, 2 = No Winner Yet
  if (gameState.length < 5) return 2;
  let p0 = gameState.filter((item) => {
    if (item.player == 0) return item;
  });
  p0 = p0.map((item) => item.id);
  let px = gameState.filter((item) => {
    if (item.player == 1) return item;
  });
  px = px.map((item) => item.id);
  if (p0 != null && px != null) {
    var win0 = win.filter((item) => {
      return isSuperset(new Set(p0), new Set(item));
    });
    var winX = win.filter((item) => {
      return isSuperset(new Set(px), new Set(item));
    });
  }
  if (win0.length > 0) return 0;
  else if (winX.length > 0) return 1;
  return 2;
};

function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

ReactDOM.render(
  <Game />, 
  document.getElementById('root'));