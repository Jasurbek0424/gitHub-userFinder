import React, { useMemo } from "react";
import { Box, Typography, Grid, CircularProgress, ImageListItem } from "@mui/material";
import { useGithub } from "../context/GithubProvider";
import RepoItem from "./RepoItem";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import notFound from "../assets/notFound.png"

const RepoList: React.FC = () => {
  const { state, loadMoreRepos } = useGithub();

  const sentinelRef = useInfiniteScroll({
    onIntersect: () => {
      if (!state.loadingRepos && state.hasMoreRepos) loadMoreRepos();
    },
    enabled: !!state.username && state.hasMoreRepos,
    rootMargin: "200px",
  });

  const content = useMemo(() => {
    if (!state.username)
      return (
        <Box textAlign="center" mt={8}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            GitHub User Finder
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={1}>
            Search for any GitHub user to view their profile, repositories, and
            more.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try searching for popular developers or your favorite open source
            contributors!
          </Typography>
        </Box>
      );

    if (state.loadingUser)
      return (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      );

    if (state.error)
      return (
        <Box textAlign="center" mt={6}>
          <Typography variant="h6" color="error" mb={2}>
            {state.error.includes("Not Found") ? "User not found" : state.error}
          </Typography>
          <ImageListItem sx={{ width: 250, mx: 'auto'}}>
            <img
              src={notFound}
              alt="not found"
              loading="lazy"
            />
          </ImageListItem>
        </Box>
      );

    if (state.repos.length === 0 && state.user)
      return (
        <Box textAlign="center" mt={6}>
          <Typography variant="body1" color="text.secondary">
            No public repositories found.
          </Typography>
        </Box>
      );

    return (
      <>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {state.repos.map((repo) => (
            <Grid item xs={12} sm={6} md={4} key={repo.id}>
              <RepoItem repo={repo} />
            </Grid>
          ))}
        </Grid>

        {state.loadingRepos && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress size={20} />
          </Box>
        )}

        <div ref={sentinelRef as any} />
      </>
    );
  }, [
    state.username,
    state.loadingUser,
    state.error,
    state.repos,
    state.loadingRepos,
  ]);

  return <Box>{content}</Box>;
};

export default RepoList;
