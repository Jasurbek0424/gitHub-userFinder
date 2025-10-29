import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Link,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGithub } from "../context/GithubProvider";

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(14),
  height: theme.spacing(14),
  marginRight: theme.spacing(2),
}));

const ProfileCard: React.FC = () => {
  const { state } = useGithub();
  const user = state.user;
  if (!user) return null;
  return (
    <Card  >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
        >
          <LargeAvatar alt={user.login} src={user.avatar_url} />
          <Box flex={1} textAlign={{ xs: "center", sm: "left" }}>
            <Typography variant="h6">{user.name ?? user.login}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              @{user.login}
            </Typography>
            {user.bio && (
              <Typography variant="body2" mt={1}>
                {user.bio}
              </Typography>
            )}
            <Box
              mt={1}
              display="flex"
              gap={1}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Chip label={`Followers: ${user.followers}`} size="small" />
              <Chip label={`Following: ${user.following}`} size="small" />
              <Chip label={`Public Repos: ${user.public_repos}`} size="small" />
            </Box>
            <Box mt={1}>
              <Link
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Link>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
