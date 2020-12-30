import { motion } from "framer-motion";
import styled from "styled-components/macro";

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Circle = styled(motion.li)`
  &.item {
    font-size: 3rem;
    background: white;
    border-radius: 100%;

    &:hover {
      background: ${({ selected }) => !selected && "gainsboro"};
      cursor: pointer;
    }
  }

  .item-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

const Item = ({ selected, onClick }) => (
  <Circle
    className="item"
    variants={item}
    selected={selected}
    whileHover={!selected && { scale: 1.1 }}
    whileTap={
      !selected && {
        scale: 0.8,
        borderRadius: "100%",
      }
    }
  >
    <motion.div
      className="item-container"
      whileHover={!selected && { scale: 1.1 }}
      onClick={onClick}
      style={{ color: selected === 1 ? "red" : "blue" }}
    >
      {selected ? (selected === 1 ? "X" : "O") : ""}
    </motion.div>
  </Circle>
);

export default Item;
