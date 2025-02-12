import { Card, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import DefaultUserImage from '../../../assets/ae_user.png';
import PropTypes from "prop-types";
import { ModeEdit } from "@mui/icons-material";
import { Stack } from "@mui/system";
import RolePopover from "../role/RolePopover";
import { useState } from "react";

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default function UserCard(props) {

    const { user } = props;
    const [rolePopoverEl, setRolePopoverEl] = useState(null);

    return (
        <Card sx={{ height: "100%", cursor: "pointer", borderLeft: "5px solid rgb(193 138 138)" }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <Typography gutterBottom variant="h6" component="h2">{user?.username}</Typography>
                        <Typography gutterBottom variant="body2" component="h6">Group: {user?.group?.groupName}</Typography>
                        <Typography gutterBottom variant="body2" component="h6">Tenant: {user?.group?.tenant?.tenantName}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ alignSelf: "center" }}>
                        <CardMedia
                            component={'img'}
                            alt={user?.username}
                            image={user?.userImage ? user.userImage : DefaultUserImage}
                            sx={{ objectFit: "contain", height: "100px" }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction={"row"} spacing={1}>
                            {
                                user?.roles.map((role, idx) => {
                                    return (
                                        <Chip label={role.name} size="small" key={idx} sx={{ background: "#518575 !important" }} />
                                    )
                                })
                            }
                            <ModeEdit fontSize="small" onClick={(event) => {
                                setRolePopoverEl(event.target)
                            }} />
                            {
                                rolePopoverEl
                                    ? <RolePopover assignedRoles={user?.roles} el={rolePopoverEl} user={user}
                                        handleClose={() => {
                                            setRolePopoverEl(null);
                                        }} />
                                    : <></>
                            }
                        </Stack>
                    </Grid>                   
                </Grid>
            </CardContent>
        </Card>
    );
}