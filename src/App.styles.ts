import styled from "styled-components";
import { AppBar, Box } from "@mui/material";

export const StyledAppBar = styled(AppBar)<{ mode: "light" | "dark" }>`
  background-color: ${({ mode }) =>
    mode === "dark" ? "#0c121c" : "#1049f1"};
  color: #fff;
  box-shadow: ${({ mode }) =>
    mode === "dark"
      ? "0px 2px 10px rgba(0,0,0,0.7)"
      : "0px 2px 10px rgba(16,73,241,0.3)"};
  transition: all 0.3s ease;
`;

export const StyledFooter = styled(Box)<{ mode: "light" | "dark" }>`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 20px;
  font-weight: 500;
  letter-spacing: 0.2px;
`;


// background-color: ${({ mode }) =>
//     mode === "dark" ? "#0c121c" : "#1049f1"};
//   color: #fff;
//   box-shadow: ${({ mode }) =>
//     mode === "dark"
//       ? "0px -2px 8px rgba(0,0,0,0.5)"
//       : "0px -2px 8px rgba(16,73,241,0.25)"};
//   transition: all 0.3s ease;
