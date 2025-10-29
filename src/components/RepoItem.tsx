import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import CodeIcon from "@mui/icons-material/Code";
import { GitHubRepo } from "../api/github";

const RepoItem: React.FC<{ repo: GitHubRepo }> = ({ repo }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 1,
        border: `1px solid ${
          theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "#e0e0e0"
        }`,
        transition: "all 0.25s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        boxShadow: "none",
        "&:hover": {
          transform: "translateY(-8px)",
          borderColor: "#1049f1",
          boxShadow: "0 6px 20px rgba(16,73,241,0.25)",
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          component="a"
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            display: "block",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {repo.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            mb: 1.5,
          }}
        >
          {repo.description || "No description available"}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mt="auto">
          <Chip
            label={repo.language || "N/A"}
            size="small"
            sx={{
              fontWeight: 500,
              height: 22,
            }}
          />

          <Box display="flex" alignItems="center" gap={0.3}>
            <StarIcon fontSize="small" sx={{ color: "text.secondary" }} />
            <Typography variant="body2">{repo.stargazers_count}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={0.3}>
            <ForkRightIcon fontSize="small" sx={{ color: "text.secondary" }} />
            <Typography variant="body2">{repo.forks_count}</Typography>
          </Box>

          <Box flexGrow={1} />
          <CodeIcon fontSize="small" color="primary" />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RepoItem;
