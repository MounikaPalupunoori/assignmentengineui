import { Chip, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../../edvenswa.ae.common/search/SearchFilter";
import { doGetTenants } from "../actions/action";
import TenantCard from "./TenantCard";

export default function Tenants(props) {

    const navigate = useNavigate();

    const [tenants, setTenants] = useState([]);
    const [filteredTenants, setFilteredTenants] = useState([]);

    const handleLoading = (state) => {
        props.onLoading(state);
    };

    const handleSuccess = (data) => {
        setTenants(data);
        setFilteredTenants(data);
    };

    const handleFailure = (error) => {
        props.onError(error);
    };

    useEffect(() => {
        doGetTenants(handleSuccess, handleFailure, handleLoading);
        // eslint-disable-next-line       
    }, []);

    return (
        <Container component={"main"} maxWidth={"lg"} style={styles.ae_tenants_container}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Chip label="Create Tenant" onClick={(event) => {
                        event.preventDefault();
                        navigate("/console/tenant/create");
                    }}/>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "end" }}>
                    <SearchFilter elements={tenants} searchKey="tenantName" filteredElements= {filteredTenants} setFilteredElements={setFilteredTenants} />
                </Grid>
                {
                    filteredTenants && filteredTenants.length > 0
                        ? filteredTenants.map((tenant, idx) => {
                            return (
                                <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                                    <TenantCard tenant={tenant} {...props}/>
                                </Grid>
                            )
                        })
                        : <></>
                }
            </Grid>
        </Container>
    )
};

const styles = {
    ae_tenants_container: {
        marginTop: "2rem"
    }
}