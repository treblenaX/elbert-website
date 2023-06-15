import { Box, Tab, Tabs, styled } from "@mui/material";
import Theme from "../../client/Theme";
import { ReactNode, SyntheticEvent, useState } from "react";
import ProfileRepo from "./ProfileRepo";
import { PinnedRepo } from "../../models/PinnedRepo";

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

interface ProfileBodyProps {
  pinnedRepos: PinnedRepo[]
}

export default function ProfileBody(props: ProfileBodyProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
            paddingTop: '50px',
            paddingLeft: '25px',
            borderBottom: '1px solid ' + Theme.COLOR.DIVIDER
          }}
        >
          <ProfileTab label="About Me" />
          <ProfileTab label="Pinned Repos" />
          <ProfileTab label="Item Three" />
        </ProfileTabs>
        <Box>
          <ProfileTabPanel value={value} index={0}>
            About Me
          </ProfileTabPanel>
          <ProfileTabPanel value={value} index={1}>
            <ProfileRepo pinnedRepos={props.pinnedRepos} />
          </ProfileTabPanel>
          <ProfileTabPanel value={value} index={2}>
            Item Three
          </ProfileTabPanel>
        </Box>
      </Box>
    </Box>
  )
}
