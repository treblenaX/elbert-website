import { Box } from "@mui/material";
import ProfileBodyTabs from "./ProfileBodyTabs";

export default function ProfileBody() {

    return (
        <Box
            style={{
                overflow: 'auto',
                height: '100%'
            }}
        >
            <ProfileBodyTabs />
        </Box>
    )
}
