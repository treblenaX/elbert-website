import { Box, Divider, Drawer, Grid, IconButton, Typography, styled } from "@mui/material";
import Theme from "../../client/Theme";
import Image from "next/image";
import PROFILE_INFO from "../../public/information/profile.json";
import { SocialIcon } from 'react-social-icons';

export default function ProfileCard() {
  return (
    <Grid container spacing={2}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '50px'
      }}
    >
      <Grid item>
        <Grid container spacing={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Grid item
            xs={10}
            md={6}
          >
            <ProfileBadge />
          </Grid>
          <Grid item
            xs={11}
            md={6}
          >
            <Typography
              sx={{
                color: Theme.COLOR.TEXT.LIGHT,
              }}
            >
              I build innovative solutions to empower every person’s potential to achieve more!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider orientation="horizontal" flexItem
        sx={{
          width: '100%',
          borderRadius: '15px',
          backgroundColor: Theme.COLOR.DIVIDER
        }}
      />
    </Grid>
  )
}

function ProfileBadge() {
  return (
    <Grid container
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Grid item
        sx={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Grid item>
          <Image
            src="/images/elbert.jpg"
            alt="Picture of Elbert Cheng"
            width={250}
            height={250}
            style={{
              borderRadius: '50%'
            }}
          />
        </Grid>
        <Grid item>
          <SocialMediaBar />
        </Grid>
      </Grid>
      <Grid item>
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