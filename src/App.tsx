import React, { useMemo, useState } from "react";
import {
  CssBaseline,
  Container,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./theme/theme";
import { GithubProvider } from "./context/GithubProvider";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import RepoList from "./components/RepoList";
import ThemeToggle from "./components/ThemeToggle";
import { StyledAppBar, StyledFooter } from "./App.styles";

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">(
    () => (localStorage.getItem("ghuf_theme") as "light" | "dark") ?? "light"
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("ghuf_theme", next);
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GithubProvider>
        <StyledAppBar mode={mode} position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              GitHub User Finder
            </Typography>
            <ThemeToggle mode={mode} toggle={toggleMode} />
          </Toolbar>
        </StyledAppBar>

        <Container sx={{ mt: 6, mb: 10, maxWidth: "md" }}>
          <Box mb={4}>
            <SearchBar />
          </Box>

          <Box mb={4}>
            <ProfileCard />
          </Box>

          <Box mb={4}>
            <RepoList />
          </Box>
        </Container>

        {/* <StyledFooter mode={mode}>
          By ● Jasurbek Xakimbekov
        </StyledFooter> */}
      </GithubProvider>
    </ThemeProvider>
  );
};

export default App;
