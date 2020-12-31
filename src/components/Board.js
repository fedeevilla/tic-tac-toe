import { motion } from "framer-motion";
import { useCallback } from "react";
import styled from "styled-components/macro";
import Item from "./Item";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 360,
    transition: {
      delay: 0.2,
      delayChildren: 0.3,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 250,
      damping: 30,
    },
  },
};

const Table = styled(motion.ul)`
  width: 200px;
  height: 200px;
  display: grid;
  overflow: hidden;
  margin: auto;
  list-style: none;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 25px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
`;

const Board = ({ array, setSelected, turn, setTurn, winner }) => {
  const handleSelect = useCallback(
    (item) => {
      if (!winner && !item.selected) {
        setSelected(
          array.map((i) =>
            i.id === item.id
              ? {
                  id: i.id,
                  selected: turn,
                }
              : i
          )
        );
        setTurn(turn === 1 ? 2 : 1);
      }
    },
    [array, setSelected, turn, setTurn, winner]
  );

  return (
    <Table variants={container} initial="hidden" animate="visible">
      {array.map((item) => (
        <Item
          key={item.id}
          selected={item.selected}
          onClick={() => handleSelect(item)}
        />
      ))}
    </Table>
  );
};

export default Board;
