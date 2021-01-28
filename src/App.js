import * as React from "react";
import { motion } from "framer-motion";
import Board from "./components/Board";
import styled from "styled-components/macro";
import { verifyWinner } from "./utils";
import Button from "./components/Button";
import History from "./components/History";

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

const Winner = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const history = JSON.parse(localStorage.getItem("history"));

const App = () => {
  const [isVisible, setVisible] = React.useState(false);
  const [turn, setTurn] = React.useState(1);
  const [array, setSelected] = React.useState(initialState);
  const [winner, setWinner] = React.useState(null);
  const [player1wins, setPlayer1] = React.useState(history?.player1wins || 0);
  const [player2wins, setPlayer2] = React.useState(history?.player2wins || 0);

  React.useEffect(() => {
    if (verifyWinner(array)) {
      setWinner(turn);
      if (turn === 1) {
        setPlayer2(player2wins + 1);
      } else {
        setPlayer1(player1wins + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array, turn]);

  return (
    <div style={{ margin: 20 }}>
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
            <Winner
              initial={{ scale: 0.5 }}
              animate={{
                scale: 1,
              }}
            >
              <Title>{`Player ${turn ? 1 : 2} wins!`}</Title>
              <Button
                style={{ fontSize: 18 }}
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
            <Title initial={{ x: "100vh" }} animate={{ x: 0, y: 0 }}>
              {`Player ${turn} plays`}
            </Title>
          )}
          <Wrapper>
            <Board
              winner={winner}
              turn={turn}
              setTurn={setTurn}
              array={array}
              setSelected={setSelected}
            />
            <History
              player1wins={player1wins}
              player2wins={player2wins}
              setPlayer1={setPlayer1}
              setPlayer2={setPlayer2}
            />
          </Wrapper>
        </>
      )}
    </div>
  );
};

export default App;
