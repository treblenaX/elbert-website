import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Box, Button, CSSObject, Divider, Grid, IconButton, Theme as t, Typography, styled, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, CssBaseline } from '@mui/material'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import ProfileBody from '../components/profile/ProfileBody'
import { getPinnedRepos, getProfileCommitCount } from '../lib/api/github/GraphQL';
import calculateOverallRepoMetrics from '../lib/repo/RepoCalculator';
import { useTheme } from '@emotion/react'
import AccountCircle from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Theme from '../client/Theme';
import { InboxOutlined, MailOutline } from '@mui/icons-material';

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

const openedMixin = (theme: t): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: t): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

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
    <Box sx={{ 
      display: 'flex',
      backgroundColor: Theme.COLOR.PRIMARY
    }}>
      <CssBaseline />
      <Head>
        <title> Home | Elbert Cheng</title>
      </Head>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
          <AccountCircle />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Elbert K. Cheng
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <Drawer variant="persistent" open={open}>
        <Box
          sx={{
            backgroundColor: Theme.COLOR.PRIMARY
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index % 2 === 0 ? <InboxOutlined /> : <MailOutline />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer> */}
      <Box>
        <DrawerHeader />
        <ProfileBody
          pinnedRepos={pinnedRepos}
          overallRepoMetrics={overallRepoMetrics}
        />
      </Box>
    </Box>
  )
}
