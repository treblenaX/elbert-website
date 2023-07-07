import { Box, Grid, Typography } from "@mui/material";
import GithubLanguagePieChart from "../charts/GithubLanguagePieChart";

export default function ProfileOverview() {
  return (
    <Box>
      <Typography
        style={{
          color: '#FFFFFF'
        }}
      >
        Hello World
      </Typography>
      <Grid container
          style={{
            height: '300px',
          }}
        >
        <Grid item
          style={{
            height: '300px',
          }}
        >
        </Grid>
      </Grid>
    </Box>
  )
}