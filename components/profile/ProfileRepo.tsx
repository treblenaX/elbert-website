import { Box, Grid, Typography, Link } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Theme from "../../client/Theme";
import GITHUB_LANGUAGE_COLORS from "../../public/github_language_colors.json";
import { PinnedRepo } from "../../models/PinnedRepo";

interface ProfileRepoProps {
  pinnedRepos: PinnedRepo[]
}

export default function ProfileRepo(props: ProfileRepoProps) {
  const pinnedRepos = props.pinnedRepos;

  return (
    <Box
      style={{
        overflow: 'auto',
        height: '100%'
      }}
    >
      <Grid container
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        columnSpacing={3}
        sx={{
          padding: '30px',
        }}
      >
        {
          pinnedRepos.map((repo) => {
            return (
              <Grid item key={repo.name} xs={6}>
                {buildRepoItemComponent(repo)}
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  )
}

function buildRepoItemComponent(repo: PinnedRepo) {
  let trimmed_description = ''

  if (repo.description) {    // no description
    trimmed_description = repo.description.length > 250 ? repo.description.substring(0, 250) + '...' : repo.description
  }

  const raw_updated_at = new Date(repo.updatedAt)
  const updated_at = `${raw_updated_at.getUTCMonth() + 1}-${raw_updated_at.getUTCDate()}-${raw_updated_at.getUTCFullYear()}`

  return (
    <Box
      sx={{
        border: '1px solid ' + Theme.COLOR.DIVIDER,
        borderRadius: '15px',
        padding: '10px 20px 20px 0px',
        height: '100%'
      }}
    >
      <Grid container
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: '30px',
          paddingTop: '10px',
          flexDirection: 'row',
          flexWrap: 'nowrap'
        }}
      >
        <Grid item>
          <BookmarkBorderIcon sx={{
            color: GITHUB_LANGUAGE_COLORS[repo.languages[0].name].color,
            width: '1.5rem',
          }} />
        </Grid>
        <Grid item>
          <Typography variant="h6"
            sx={{
              color: Theme.COLOR.TEXT.BLUE,
              fontSize: '1rem',
              fontWeight: 'bold',
              paddingLeft: '5px',
              top: 0,
              paddingBottom: '5px'
            }}
          >
            <Link href={repo.url} sx={{
              color: Theme.COLOR.TEXT.BLUE,
            }}>{repo.name}</Link>
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h6"
        sx={{
          color: Theme.COLOR.TEXT.GREY,
          fontStyle: 'italic',
          fontSize: '.75rem',
          top: 0,
          paddingLeft: '30px',
          paddingBottom: '5px'
        }}
      >
        {`${repo.languages[0].name} • Last Updated on ${updated_at}`}
      </Typography>
      <Typography variant="h6"
        sx={{
          color: Theme.COLOR.TEXT.GREY,
          paddingLeft: '30px',
          fontSize: '.75rem',
          top: 0
        }}
      >
        {trimmed_description}
      </Typography>
    </Box>
  )
}