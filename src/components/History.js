import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Button from "./Button";

const Title = styled.h1`
  color: white;
  font-size: 20px;
`;

const Player = styled.p`
  color: white;
  font-size: 18px;
`;

const History = ({ player1wins, player2wins, setPlayer1, setPlayer2 }) => {
  const [history, setHistory] = useState({});

  useEffect(() => {
    localStorage.setItem(
      "history",
      JSON.stringify({ player1wins, player2wins })
    );
    setHistory({ player1wins, player2wins });
  }, [player1wins, player2wins]);

  return (
    <motion.div
      style={{ marginLeft: 20 }}
      initial={{ opacity: 0, x: "100vh" }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { delay: 2.2, type: "tween" },
      }}
    >
      <Title>History</Title>
      <Player>{`Player 1: ${history.player1wins || 0} wins.`}</Player>
      <Player>{`Player 2: ${history.player2wins || 0} wins.`}</Player>
      <Button
        onClick={() => {
          localStorage.setItem(
            "history",
            JSON.stringify({ player1wins: 0, player2wins: 0 })
          );
          setHistory({});
          setPlayer1(0);
          setPlayer2(0);
        }}
      >
        Clear
      </Button>
    </motion.div>
  );
};

export default History;
