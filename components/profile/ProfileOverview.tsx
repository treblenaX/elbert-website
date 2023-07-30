import { Box, Grid, Typography } from "@mui/material";
import GithubLanguagePieChart from "./GithubLanguagePieChart";
import GithubStatCard from "./GithubStatCard";
import Theme from "../../client/Theme";
import useElementSize from "../../client/hooks/useElementSize";

interface ProfileOverviewProps {
  overallRepoMetrics: any
}

export default function ProfileOverview(props: ProfileOverviewProps) {
  const overallRepoMetrics = props.overallRepoMetrics

  console.log(overallRepoMetrics)

  return (
    <Box>
      <Grid container
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        style={{
          height: '300px',
        }}
      >
        <Grid item
          flexBasis="49%"
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              paddingTop: '30px',
              textAlign: 'center',
              color: Theme.COLOR.TEXT.LIGHT
            }}
          >
            Most Language Used
          </Typography>
          <GithubLanguagePieChart overallRepoMetrics={overallRepoMetrics} />
        </Grid>
        <Grid item
          flexBasis="49%"
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <Box
            paddingTop="30px"
          >
            <GithubStatCard />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}