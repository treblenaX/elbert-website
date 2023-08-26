import { Box, Grid, Icon, Typography } from "@mui/material";
import Theme from "../../client/Theme";
import { StarOutline, History } from '@mui/icons-material';

export default function GithubStatCard() {

  return (
    <Grid container
     sx={{
      border: `1px solid ${Theme.COLOR.DIVIDER}`,
      borderRadius: '15px',
      flexDirection: 'column',
      padding: '15px'
     }}
    >
      <Grid item>
        <Grid container
          sx={{
            flexDirection: 'row',
          }}
        >
          <Grid item
            sx={{
              color: Theme.COLOR.TEXT.LIGHT,
              paddingRight: '5px'
            }}
          >
            <StarOutline />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                color: Theme.COLOR.TEXT.GREY,
                fontSize: '0.8rem'
              }}
            >
              Total Stars Earned: 
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                color: Theme.COLOR.TEXT.GREY,
                fontWeight: 'bold',
                fontSize: '0.8rem',
                paddingLeft: '5px'
              }}
            >
              61.2k
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container
          sx={{
            flexDirection: 'row',
          }}
        >
          <Grid item
            sx={{
              color: Theme.COLOR.TEXT.LIGHT,
              paddingRight: '5px'
            }}
          >
            <History />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                color: Theme.COLOR.TEXT.GREY,
                fontSize: '0.8rem'
              }}
            >
              Total Commits ({ new Date().getFullYear() }):
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                color: Theme.COLOR.TEXT.GREY,
                fontWeight: 'bold',
                fontSize: '0.8rem',
                paddingLeft: '5px'
              }}
            >
              61.2k
            </Typography>     
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container
          sx={{
            flexDirection: 'row',
          }}
        >
          <Grid item
            sx={{
              color: Theme.COLOR.TEXT.LIGHT,
              paddingRight: '5px'
            }}
          >
            <History />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                color: Theme.COLOR.TEXT.GREY,
                fontSize: '0.8rem'
              }}
            >
              Contributed To:
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                color: Theme.COLOR.TEXT.GREY,
                fontWeight: 'bold',
                fontSize: '0.8rem',
                paddingLeft: '5px'
              }}
            >
              61.2k
            </Typography>     
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}