import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Box, Button, CSSObject, Divider, Grid, IconButton, Theme as t, Typography, styled, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, CssBaseline, useScrollTrigger, AppBar, Container } from '@mui/material'
import { calculateOverallRepoMetrics, getPinnedRepos, getProfileCommitCount } from '../lib/repo/MetricFetcher';
import Theme from '../client/Theme';
import ProfileGithub from '../components/profile/ProfileGithub';
import ProfileCard from '../components/profile/ProfileCard';

const DRAWER_WIDTH = 400

export async function getServerSideProps() {
  const pinnedRepoData = await getPinnedRepos()
  // Total count is commit count here
  const commitCount = (await getProfileCommitCount()).total_count

  return {
    props: {
      pinnedRepos: JSON.stringify(pinnedRepoData),
      overallRepoMetrics: JSON.stringify(calculateOverallRepoMetrics(pinnedRepoData)),
      commitCount: JSON.stringify(commitCount)
    }
  }
}

interface AppBarProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}


// function ElevationScroll(props: AppBarProps) {
//   const { children, window } = props;
//   // Note that you normally won't need to set the window ref as useScrollTrigger
//   // will default to window.
//   // This is only being set here because the demo is in an iframe.
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//     target: window ? window() : undefined,
//   });

//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   });
// }

interface HomeProps {
  pinnedRepos: string,
  overallRepoMetrics: string
}

export default function Home(props: HomeProps) {
  const pinnedRepos = JSON.parse(props.pinnedRepos)
  const overallRepoMetrics = JSON.parse(props.overallRepoMetrics)

  return (
    <Box sx={{ 
      display: 'flex',
      backgroundColor: Theme.COLOR.PRIMARY
    }}>
      <CssBaseline />
      <Head>
        <title> Home | Elbert Cheng</title>
      </Head>
      <Container>
        <Box>
          <Box>
            <Typography
              variant="h4"
              sx={{
                paddingTop: '30px',
                color: Theme.COLOR.TEXT.LIGHT,
                fontSize: '0.9rem'
              }}
            >
              PROFILE
            </Typography>
            <ProfileCard />
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{
                paddingTop: '30px',
                color: Theme.COLOR.TEXT.LIGHT,
                fontSize: '0.9rem'
              }}
            >
              GITHUB
            </Typography>
            <ProfileGithub
              pinnedRepos={pinnedRepos}
              overallRepoMetrics={overallRepoMetrics}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
