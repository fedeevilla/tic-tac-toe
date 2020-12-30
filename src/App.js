import * as React from "react";
import { motion } from "framer-motion";
import Board from "./components/Board";
import styled from "styled-components";
import { verifyWinner } from "./utils";

const initialState = [
  { id: 1, selected: null },
  { id: 2, selected: null },
  { id: 3, selected: null },
  { id: 4, selected: null },
  { id: 5, selected: null },
  { id: 6, selected: null },
  { id: 7, selected: null },
  { id: 8, selected: null },
  { id: 9, selected: null },
];

const Splash = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(motion.h1)`
  color: white;
  text-align: center;
`;

const Winner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled(motion.button)`
  background: #0299ff;
  padding: 15px;
  font-size: 22px;
  border: none;
  border-radius: 5px;
  color: white;

  &:focus {
    outline: none;
  }
`;

const App = () => {
  const [isVisible, setVisible] = React.useState(false);
  const [turn, setTurn] = React.useState(1);
  const [array, setSelected] = React.useState(initialState);
  const [winner, setWinner] = React.useState(null);
  const [player1wins, setPlayer1] = React.useState(0);
  const [player2wins, setPlayer2] = React.useState(0);

  React.useEffect(() => {
    if (verifyWinner(array)) {
      setWinner(turn);
      if (turn === 1) {
        setPlayer1(player1wins + 1);
      } else {
        setPlayer2(player2wins + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array, turn]);

  return (
    <div>
      {!isVisible ? (
        <Splash>
          <Title initial={{ x: "-100vh" }} animate={{ x: 0, y: 0 }}>
            Welcome strangers, let's play Tic Tac Toe!
          </Title>
          <Button
            initial={{ x: "100vh" }}
            animate={{ x: 0, y: 0 }}
            style={{ margin: "auto" }}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              setVisible(true);
            }}
          >
            Play!
          </Button>
        </Splash>
      ) : (
        <>
          {winner ? (
            <Winner>
              <Title initial={{ x: "100vh" }} animate={{ x: 0, y: 0 }}>
                {`Player ${turn ? 1 : 2} wins!`}
              </Title>

              <Button
                onClick={() => {
                  setSelected(initialState);
                  setTurn(1);
                  setWinner(null);
                }}
              >
                Play Again
              </Button>
            </Winner>
          ) : (
            <>
              <Title initial={{ x: "100vh" }} animate={{ x: 0, y: 0 }}>
                {`Player ${turn} plays`}
              </Title>
            </>
          )}
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Board
              winner={winner}
              turn={turn}
              setTurn={setTurn}
              array={array}
              setSelected={setSelected}
            />
            <div>
              <h1 style={{ marginLeft: 20 }}>History</h1>
              <p>{`Player 1: ${player1wins} wins.`}</p>
              <p>{`Player 2: ${player2wins} wins.`}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
