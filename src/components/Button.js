import { motion } from "framer-motion";
import styled from "styled-components/macro";

const CustomButton = styled(motion.button)`
  background: #0299ff;
  padding: 15px;
  font-size: 22px;
  border: none;
  border-radius: 5px;
  color: white;
  font-family: "Open Sans", Arial, sans-serif;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Button = ({ children, ...props }) => (
  <CustomButton {...props}>{children}</CustomButton>
);
export default Button;
