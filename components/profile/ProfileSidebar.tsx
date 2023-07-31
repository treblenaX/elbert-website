import { Box, Divider, Drawer, Grid, IconButton, Typography, styled } from "@mui/material";
import Theme from "../../client/Theme";
import ProfileBadge from "./ProfileBadge";
import Image from "next/image";
import PROFILE_INFO from "../../public/information/profile.json";
import { SocialIcon } from 'react-social-icons';

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
      <Image
        src="/images/elbert.jpg"
        alt="Picture of Elbert Cheng"
        width={250}
        height={250}
        style={{
          borderRadius: '50%'
        }}
      />
      <SocialMediaBar />
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
        {PROFILE_INFO.profile.name}
      </Typography>
      <Typography variant="h2"
        sx={{
          textAlign: 'center',
          color: Theme.COLOR.TEXT.LIGHT,
          fontSize: '1rem'
        }}
      >
        {PROFILE_INFO.profile.role}
      </Typography>
      <Typography variant="h2"
        sx={{
          textAlign: 'center',
          paddingTop: '5px',
          color: Theme.COLOR.TEXT.LIGHT,
          fontSize: '1rem'
        }}
      >
        {PROFILE_INFO.profile.hometown}
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
        overflowY: 'auto',
        height: '56vh'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '20px'
          
        }}
      >
        {
          PROFILE_INFO.profile.badges.map((b, i) => {
            return (
              <ProfileBadge
                key={i}
                image_url={b.img}
                image_url_alt={b.img_alt}
                headline_text={b.headline}
                badge_text={b.text}
                time={b.time}
              />               
            )
          })
        }
      </Box>
    </Grid>
  </Grid>
  )
}

function SocialMediaBar() {
  return (
    <Grid container
      flexDirection="column"
      paddingLeft="20px"
    >
      {
        PROFILE_INFO.profile.socials.map((u, i) => {
          return (
            <Grid item
              padding="5px"
              key={i}
            >
              <SocialIcon url={u} bgColor={Theme.COLOR.TEXT.LIGHT} />
            </Grid>
          )
        })
      }
    </Grid>  
  )
}