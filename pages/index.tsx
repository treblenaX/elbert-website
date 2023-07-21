import Head from 'next/head'
import React, { useEffect } from 'react'
import Theme from '../client/Theme'
import { Box, Divider, Grid } from '@mui/material'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import ProfileBody from '../components/profile/ProfileBody'
import { getMyPinnedRepos } from '../lib/api/github/GraphQL';
import calculateOverallRepoMetrics from '../lib/repo/RepoCalculator';

export async function getServerSideProps() {
  const pinnedRepoData = await getMyPinnedRepos();
  const metrics = {
    repoMetrics: calculateOverallRepoMetrics(pinnedRepoData)
  }

  return {
    props: {
      pinnedRepos: JSON.stringify(pinnedRepoData),
      metrics: JSON.stringify(metrics)
    }
  }
}

interface HomeProps {
  pinnedRepos: string,
  metrics: string
}

export default function Home(props: HomeProps) {
  const pinnedRepos = JSON.parse(props.pinnedRepos)
  const metrics = JSON.parse(props.metrics)
  const repoMetrics = metrics.repoMetrics

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
        <Grid container spacing={0}
          sx={{
            flexDirection: 'row',
            flexWrap: 'nowrap',
            height: '100vh'
          }}
        >
          <Grid item
            xs={3}
          >
            <ProfileSidebar />
          </Grid>
          <Divider orientation="vertical" flexItem
            sx={{
              width: '1px',
              height: '100vh',
              borderRadius: '15px',
              backgroundColor: Theme.COLOR.DIVIDER
            }}
          />
          <Grid item
            xs={9}
          >
            <ProfileBody
              pinnedRepos={pinnedRepos}
              repoMetrics={repoMetrics}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
