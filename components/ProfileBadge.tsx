import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Theme from "../client/Theme";

export interface ProfileBadgeProps {
  image_url: string,
  image_url_alt: string,
  badge_text: string
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
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '20px',
          paddingLeft: '50px'
        }}
      >
        <Image
          src={props.image_url}
          alt={props.image_url_alt}
          width={50}
          height={50}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: '50%',
            boxShadow: '0 0 5px 3px rgba(255, 255, 255, 0.5)',
            flexShrink: 0
          }}
        />
        <Typography variant="h5"
          sx={{
            color: Theme.COLOR.TEXT.LIGHT,
            padding: '15px',
            paddingLeft: '30px',
            fontSize: '1.1rem',
            top: 0
          }}
        >
          {props.badge_text}
        </Typography>
      </Grid>
    </Box>
  )
}