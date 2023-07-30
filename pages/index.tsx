import Head from 'next/head'
import React, { useEffect } from 'react'
import Theme from '../client/Theme'
import { Box, Divider, Grid } from '@mui/material'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import ProfileBody from '../components/profile/ProfileBody'
import { getPinnedRepos, getProfileCommitCount } from '../lib/api/github/GraphQL';
import calculateOverallRepoMetrics from '../lib/repo/RepoCalculator';

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

interface HomeProps {
  pinnedRepos: string,
  overallRepoMetrics: string
}

export default function Home(props: HomeProps) {
  const pinnedRepos = JSON.parse(props.pinnedRepos)
  const overallRepoMetrics = JSON.parse(props.overallRepoMetrics)

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
              overallRepoMetrics={overallRepoMetrics}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
