import { Box, Grid, Typography } from "@mui/material";
import GithubLanguagePieChart from "../charts/GithubLanguagePieChart";
import Theme from "../../client/Theme";
import useElementSize from "../../client/hooks/useElementSize";

interface ProfileOverviewProps {
  repoMetrics: any
}

export default function ProfileOverview(props: ProfileOverviewProps) {
  const repoMetrics = props.repoMetrics

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
            width: '100%'
          }}
        >
          <GithubLanguagePieChart repoMetrics={repoMetrics} />
        </Grid>
        <Grid item
          flexBasis="49%"
          style={{
            width: '100%'
          }}
        >
          <GithubLanguagePieChart repoMetrics={repoMetrics} />
        </Grid>
      </Grid>
    </Box>
  )
}