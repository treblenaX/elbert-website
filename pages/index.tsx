import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Box, Button, CSSObject, Divider, Grid, IconButton, Theme as t, Typography, styled, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, CssBaseline, useScrollTrigger, AppBar, Container } from '@mui/material'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import ProfileBody from '../components/profile/ProfileBody'
import { calculateOverallRepoMetrics, getPinnedRepos, getProfileCommitCount } from '../lib/repo/MetricFetcher';
import Theme from '../client/Theme';
import { InboxOutlined, MailOutline } from '@mui/icons-material';

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


function ElevationScroll(props: AppBarProps) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

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
      <React.Fragment>
        <CssBaseline />
        <AppBar
          sx={{
            borderBottom: '1px solid ' + Theme.COLOR.DIVIDER,
            padding: '0px 0px 0px 0px'
          }}
        >
          <Toolbar
            sx={{
              padding: '0px 0px 0px 0px'
            }}
          >
            <Typography variant="h6" component="div">
              Elbert K. Cheng
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Box sx={{ my: 5 }}>
            <ProfileBody
              pinnedRepos={pinnedRepos}
              overallRepoMetrics={overallRepoMetrics}
            />
          </Box>
        </Container>
      </React.Fragment>
    </Box>
  )
}
