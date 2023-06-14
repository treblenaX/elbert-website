import { Box, Grid, Paper, Typography, styled, Link } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";
import Theme from "../../client/Theme";
import GITHUB_LANGUAGE_COLORS from "../../public/github_language_colors.json";

export default function ProfileRepos() {
  const [liveRepos, setLiveRepos] = useState([]);
  const octokit = new Octokit();

  useEffect(() => {
    octokit.repos.listForUser({ username: 'treblenaX' })
      .then(({ data }) => {
        // set all live repos
        const arr = data
          .filter((repo) => {
            return !repo.archived && repo.language;
          })
          // .sort((a, b) => {
          //     // by date
          //     return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          // });
          .sort((a, b) => {
            let l1 = 0;
            let l2 = 0;

            if (a.description) l1 = a.description.length;
            if (b.description) l2 = b.description.length;

            return l2 - l1;
          });

        setLiveRepos(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (liveRepos.length == 0) {
    return (
      <Box>
        <Typography variant="h6"
          sx={{
            color: Theme.COLOR.TEXT.BLUE,
            paddingLeft: '30px',
            fontSize: '1rem',
            top: 0
          }}
        >
          Loading...
                </Typography>
      </Box>
    )
  }

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
          liveRepos.map((repo) => {
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

function buildRepoItemComponent(repo: any) {
  let trimmed_description = '';

  if (repo.description) {    // no description
    trimmed_description = repo.description.length > 250 ? repo.description.substring(0, 250) + '...' : repo.description;
  }

  const updated_at_date = new Date(repo.updated_at);
  const updated_at = `${updated_at_date.getUTCMonth() + 1}-${updated_at_date.getUTCDate()}-${updated_at_date.getUTCFullYear()}`;

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
            color: GITHUB_LANGUAGE_COLORS[repo.language].color,
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
            <Link href={repo.html_url} sx={{
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
        {`${repo.language} • Last Updated on ${updated_at}`}
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