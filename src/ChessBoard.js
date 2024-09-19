import { useState, useEffect } from "react";

const ChessBoard = ({ state }) => {
    const [prevState, setPrevState] = useState(state);
    const n = state.length;
  
    useEffect(() => {
      setPrevState(state);
    }, [state]);
  
    return (
      <div className="chess-board" style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, gridTemplateRows: `repeat(${n}, 1fr)` }}>
        {Array.from({ length: n }).map((_, i) => (
          Array.from({ length: n }).map((_, j) => {
            const isQueenPresent = state[i] === j;
            const previousQueenState = prevState[i] === j;
            const queenClass = isQueenPresent ? 'queen entering' : 'queen exiting';
  
            return (
              <div
                key={`${i}-${j}`}
                className={`cell ${(i + j) % 2 === 0 ? 'white' : 'black'}`}
              >
                {isQueenPresent && (
                  <div 
                    className={queenClass}
                    key={`queen-${i}-${j}`}
                  />
                )}
              </div>
            );
          })
        ))}
      </div>
    );
  };

  export default ChessBoard;