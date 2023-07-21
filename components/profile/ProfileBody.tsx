import { Box, Tab, Tabs, styled, Typography } from "@mui/material";
import Theme from "../../client/Theme";
import { ReactNode, SyntheticEvent, useState } from "react";
import ProfileRepo from "./ProfileRepo";
import { PinnedRepo } from "../../models/PinnedRepo";
import ProfileOverview from "./ProfileOverview";

interface ProfileBodyProps {
  pinnedRepos: PinnedRepo[],
  repoMetrics: any[]
}

export default function ProfileBody(props: ProfileBodyProps) {
  const repoMetrics = props.repoMetrics
  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box
      style={{
        overflow: 'auto',
        height: '100%'
      }}
    ><Box
      sx={{
        width: '100%'
      }}
    >
        <ProfileTabs
          value={value}
          onChange={handleChange}
          sx={{
            width: '100%',
            paddingTop: '20px',
            paddingLeft: '25px',
            borderBottom: '1px solid ' + Theme.COLOR.DIVIDER
          }}
        >
          <ProfileTab label="Overview" />
        </ProfileTabs>
        <Box>
          <ProfileTabPanel value={value} index={0}>
            <Box>
                <ProfileOverview repoMetrics={repoMetrics} />
            </Box>
            <Box>
              <Typography
                paddingLeft="35px"
                paddingBottom="5px"
                paddingTop="30px"
                textAlign="left"
                color={Theme.COLOR.TEXT.LIGHT}
              >
                Pinned Github Projects
              </Typography>
              <ProfileRepo pinnedRepos={props.pinnedRepos} />
            </Box>
          </ProfileTabPanel>
        </Box>
      </Box>
    </Box>
  )
}

interface ProfileTabsProps {
  children?: ReactNode;
  value: number;
  onChange: (event: SyntheticEvent, newValue: number) => void;
}

const ProfileTabs = styled((props: ProfileTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: Theme.COLOR.SECONDARY,
  },
});

interface ProfileTabProps {
  label: string;
}

const ProfileTab = styled((props: ProfileTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  color: Theme.COLOR.TEXT.LIGHT,
  '&.Mui-selected': {
    color: Theme.COLOR.TEXT.LIGHT
  }
}))

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function ProfileTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      {...other}
    >
      {
        value === index && (
          <Box>
            {children}
          </Box>
        )
      }
    </div>
  )
}