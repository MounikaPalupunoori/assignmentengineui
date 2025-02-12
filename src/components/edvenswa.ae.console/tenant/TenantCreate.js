import { Button, Card, CardContent, CardHeader, Container, Grid, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doCreateTenant } from "../actions/action";
import { TENANT_IMAGE_URL_FIELD_ID, TENANT_NAME_FIELD_ID } from "../constants/Constants";
import { getConsoleFields } from "../forms/GetFields";

export default function TenantCreate(props) {

    const fields = getConsoleFields([TENANT_NAME_FIELD_ID, TENANT_IMAGE_URL_FIELD_ID]);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();        
        const formData = new FormData(event.currentTarget);
        doCreateTenant(formData, handleSuccess, handleFailure, handleLoading);        
    };

    const handleLoading = (state) => {
        props.onLoading(state);
    };

    const handleSuccess = (data) => {
        navigate("/console/tenant");
    };

    const handleFailure = (error) => {
        props.onError(error)
    };

    return (
        <Container maxWidth={"sm"} component={"main"} sx={{ marginTop: "2rem" }}>
            <Card>
                <CardHeader title={"Tenant Registration"} sx={{textAlign: "center"}}></CardHeader>
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
                                    Create Tenant
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}