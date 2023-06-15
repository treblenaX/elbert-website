import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Theme from "../../client/Theme";

export interface ProfileBadgeProps {
  image_url: string,
  image_url_alt: string,
  headline_text: string,
  badge_text: string,
  time: string
}

export default function ProfileBadge(props: ProfileBadgeProps) {
  return (
    <Box
      sx={{
        border: '1px solid ' + Theme.COLOR.DIVIDER,
        borderRadius: '15px',
        width: '90%'
      }}
    >
      <Grid container spacing={2}
        sx={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'center',
          paddingTop: '30px',
          paddingBottom: '15px',
          paddingLeft: '50px'
        }}
      >
        <Image
          src={props.image_url}
          alt={props.image_url_alt}
          width={100}
          height={100}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: '50%',
            boxShadow: '0 0 5px 3px rgba(255, 255, 255, 0.5)',
            flexShrink: 0
          }}
        />
        <Box
          sx={{
            padding: '15px',
            paddingLeft: '20px',
            fontSize: '0.9rem',
            top: 0
          }}
        >
          <Typography
            color={Theme.COLOR.TEXT.LIGHT}
            fontStyle="bold"
            variant="h4"
            fontSize="1.1rem"
          >
            {props.headline_text}
          </Typography>
          <Typography 
            color={Theme.COLOR.TEXT.GREY}
            variant="h5"
            fontSize="0.9rem"
          >
            {props.badge_text}
          </Typography>
          <Typography variant="h5"
            color={Theme.COLOR.TEXT.GREY}
            fontStyle="italic"
            fontSize='0.9rem'
          >
            {props.time}
          </Typography>
        </Box>
      </Grid>
    </Box>
  )
}