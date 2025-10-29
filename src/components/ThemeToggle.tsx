import React from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

type Props = { mode: "light" | "dark"; toggle: () => void };

const ThemeToggle: React.FC<Props> = ({ mode, toggle }) => {
  return (
    <IconButton onClick={toggle} color="inherit">
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggle;
