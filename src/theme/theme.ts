import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#1049f1" },
      background: {
        default: mode === "dark" ? "#0c121c" : "#f5f7ff",
        paper: mode === "dark" ? "#121826" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#0d1117",
        secondary: mode === "dark" ? "#9ba3b4" : "#4a5568",
      },
      divider: mode === "dark" ? "#1f2937" : "#e0e0e0",
    },
    typography: {
      fontFamily: '"Inter", sans-serif',
      h4: { fontWeight: 700 },
      body1: { color: "text.secondary" },
    },
    shape: { borderRadius: 12 },
  });
