import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Theme from '../client/Theme'
import { Box, Button, Divider, Drawer, Grid, IconButton, Typography, styled } from '@mui/material'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import ProfileBody from '../components/profile/ProfileBody'
import { getPinnedRepos, getProfileCommitCount } from '../lib/api/github/GraphQL';
import calculateOverallRepoMetrics from '../lib/repo/RepoCalculator';
import { useTheme } from '@emotion/react'
import AccountCircle from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const DRAWER_WIDTH = 400

export async function getServerSideProps() {
  const pinnedRepoData = await getPinnedRepos()
  // Total count is commit count here
  const test = await getProfileCommitCount()

  console.log(test)

  return {
    props: {
      pinnedRepos: JSON.stringify(pinnedRepoData),
      overallRepoMetrics: JSON.stringify(calculateOverallRepoMetrics(pinnedRepoData))
    }
  }
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: DRAWER_WIDTH,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface HomeProps {
  pinnedRepos: string,
  overallRepoMetrics: string
}

export default function Home(props: HomeProps) {
  const pinnedRepos = JSON.parse(props.pinnedRepos)
  const overallRepoMetrics = JSON.parse(props.overallRepoMetrics)
  const [open, setOpen] = useState(true)
  const theme = useTheme()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box
        style={{
            overflow: 'hidden'
        }}
    >
      <Head>
        <title> Home | Elbert Cheng</title>
      </Head>
      <Box
        style={{
          backgroundColor: Theme.COLOR.PRIMARY
        }}
      >
          
      <IconButton
        onClick={handleDrawerOpen}
        sx={{
          color: Theme.COLOR.TEXT.LIGHT
        }}
      >
        <AccountCircle />
      </IconButton>
      <Main open={open}>
        <DrawerHeader />
        <ProfileBody
          pinnedRepos={pinnedRepos}
          overallRepoMetrics={overallRepoMetrics}
        />
      </Main>
      <Drawer 
        open={open}
        variant="persistent"
        anchor="left"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
          },
        }}
      >
        <Box  
          sx={{
            backgroundColor: Theme.COLOR.PRIMARY,
            height: '100%'
          }}
        >
          <DrawerHeader>
            <IconButton 
              onClick={handleDrawerClose}
              sx={{
                color: Theme.COLOR.TEXT.LIGHT
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <ProfileSidebar />
        </Box>
      </Drawer>
      </Box>
    </Box>
  )
}
