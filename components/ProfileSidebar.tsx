import { Box, Divider, Grid, Typography } from "@mui/material";
import ProfileImage from "./ProfileImage";
import Theme from "../client/Theme";
import ProfileBadge from "./ProfileBadge";

export default function ProfileSidebar() {

  return (
    <Grid container spacing={2}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '50px'
      }}
    >
      <Grid item
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ProfileImage />
      </Grid>
      <Grid item
        sx={{
          paddingBottom: '50px'
        }}
      >
        <Typography variant="h1"
          sx={{
            color: Theme.COLOR.TEXT.LIGHT,
            fontSize: '2rem'
          }}
        >
          Elbert Cheng
                </Typography>
        <Typography variant="h2"
          sx={{
            textAlign: 'center',
            color: Theme.COLOR.TEXT.LIGHT,
            fontSize: '1rem'
          }}
        >
          Software Engineer
                </Typography>
      </Grid>
      <Divider orientation="horizontal" flexItem
        sx={{
          width: '100%',
          borderRadius: '15px',
          backgroundColor: Theme.COLOR.DIVIDER
        }}
      />
      <Grid item
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ProfileBadge
          image_url="/images/uw_logo.png"
          image_url_alt="University of Washington Logo"
          badge_text="Graduated from the University of Washington in 2023."
        />
      </Grid>
    </Grid>
  )
}