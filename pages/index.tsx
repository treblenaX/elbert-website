import Head from 'next/head'
import React from 'react'
import Theme from '../client/Theme'
import { Box, Divider, Grid, Typography } from '@mui/material'
import ProfileSidebar from '../components/ProfileSidebar'
import RepoBody from '../components/RepoBody'

export default function Home({ allPostsData }) {
  return (
	<>
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
                    <RepoBody />
				</Grid>
			</Grid>
		</Box>
	</>
  )
}
