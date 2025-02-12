import { Button, Card, CardContent, CardHeader, Container, Grid, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { doCreateGroup } from "../actions/action";
import { GROUP_IMAGE_URL_FIELD_ID, GROUP_NAME_FIELD_ID } from "../constants/Constants";
import { getConsoleFields } from "../forms/GetFields";

export default function GroupCreate(props) {

    const fields = getConsoleFields([GROUP_NAME_FIELD_ID, GROUP_IMAGE_URL_FIELD_ID]);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData(event.currentTarget);
        const data = {
            [GROUP_NAME_FIELD_ID]: formData.get(GROUP_NAME_FIELD_ID),
            [GROUP_IMAGE_URL_FIELD_ID]: formData.get(GROUP_IMAGE_URL_FIELD_ID),
            tenant: location.state?.tenant
        };
        doCreateGroup(data, handleSuccess, handleFailure, handleLoading);
    };

    const handleLoading = (state) => {
        props.onLoading(state);
    };

    const handleSuccess = (data) => {
        navigate("/console/tenant/group", {
            state: {
                tenant: location.state?.tenant
            }
        });
    };

    const handleFailure = (error) => {
        props.onError(error)
    };

    return (
        <Container maxWidth={"sm"} component={"main"} sx={{ marginTop: "2rem" }}>
            <Card>
                <CardHeader title={"Group Registration"} sx={{ textAlign: "center" }} />                
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                fields && fields.length > 0
                                    ? fields.map((field, idx) => {
                                        return (
                                            <Grid item xs={12} key={idx}>
                                                <TextField {...field} fullWidth />
                                            </Grid>
                                        )
                                    })
                                    : <></>
                            }
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    size="small"
                                    disabled={props.loading}
                                >
                                    Create Group in {location.state?.tenant?.tenantName}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>                
            </Card>
        </Container>
    )
}