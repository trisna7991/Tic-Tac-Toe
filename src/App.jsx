import { useState } from 'react'

function Square ({value, onClickSquare}) {
  
  // console.log(value)
  return (<button onClick={onClickSquare} className='square'>{value}</button>) // tombol utama pada kotak

}



function App({xIsNext,squares,onPlay}) {

  function handleClick (i) {

    console.log('ok')
    
    if ( calculateWinner(squares) || squares[i]) return;

  
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? "X" : "O"
    // setSquare(nextSquares[2] = "Y")
    onPlay(nextSquares)
    
  }

  const winner = calculateWinner(squares)
  console.log(winner)
  let status = winner
  if (status) {
    status = 'Winner : ' + winner
  } else {
    status = 'Next Player :' + (xIsNext ? 'X' : 'O')
  }

  
  return (
    <>
    <div className='status'>{status}</div>
    <div className='board'>
      <Square value={squares[0]} onClickSquare={() => handleClick(0)} />
      <Square value={squares[1]} onClickSquare={() => handleClick(1)} />
      <Square value={squares[2]} onClickSquare={() => handleClick(2)} />
      <Square value={squares[3]} onClickSquare={() => handleClick(3)} />
      <Square value={squares[4]} onClickSquare={() => handleClick(4)} />
      <Square value={squares[5]} onClickSquare={() => handleClick(5)} />
      <Square value={squares[6]} onClickSquare={() => handleClick(6)} />
      <Square value={squares[7]} onClickSquare={() => handleClick(7)} />
      <Square value={squares[8]} onClickSquare={() => handleClick(8)} />
    </div>
    </>
  )
}

export default function Game () {

 

  // const [xIsNext, setXIsNext] = useState(true)
  // Array bersarang !
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 == 0
  const currentSquares = history[currentMove]

  console.log("Jumlah Array : " +history)

  function jumpTo (nextMove) {
    setCurrentMove(nextMove)
    // setXIsNext(nextMove % 2 === 0)
  }

  function handlePlay (nextSquares) {
    const nextHistory = [...history.slice(0, currentMove +1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length -1)
    // setXIsNext(!xIsNext)
  }

  const moves = history.map((e,move) => {

    // console.log(move)
      let description = ''
      if (move > 0) {
        description = "Go to move # " + move
      } else {
        description = "Go to start"
      }
  
      return (
        <li key={move}>
          {/* tombol untuk lompat ke array */}
          <button onClick={() => jumpTo(move)}>{description}</button> 
        </li>
      )
    })

 
  return (
    <div className='game'>
      <div className='board-name'>
        <App xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}

// Game Rules
// Aturan Main
function calculateWinner (x) {

  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
  ]

  console.log(" nilai ke - " + x)

  for (let e = 0; e < lines.length; e++) {

    const [a,b,c] = lines[e]

    if (x[a] && x[a] === x[b] && x[a] === x[c]) {

      return x[a]
    }
  }

  return false

}
