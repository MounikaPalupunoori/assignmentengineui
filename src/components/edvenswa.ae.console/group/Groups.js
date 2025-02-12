import { Chip, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchFilter from "../../edvenswa.ae.common/search/SearchFilter";
import { doGetGroupsByTenantId } from "../actions/action";
import GroupCard from "./GroupCard";

export default function TenantGroups(props) {

    const navigate = useNavigate();
    const location = useLocation();

    const [groups, setGroups] = useState([]);
    const [tenant, setTenant] = useState({});
    const [filteredGroups, setFilteredGroups] = useState([]);

    const handleLoading = (state) => {
        props.onLoading(state);
    };

    const handleSuccess = (data) => {
        setGroups(data);
        setFilteredGroups(data);
    };

    const handleFailure = (error) => {
        props.onError(error);
    };

    useEffect(() => {
        if(location && location.state) {
            const t = location.state.tenant;
            setTenant(t);
        }
        if(tenant && tenant?.id) {
            doGetGroupsByTenantId(tenant?.id, handleSuccess, handleFailure, handleLoading);
        }        
        // eslint-disable-next-line       
    }, [tenant]);

    return (
        <Container component={"main"} maxWidth={"lg"} style={styles.ae_groups_container}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Chip label="Create Group" onClick={(event) => {
                        event.preventDefault();
                        navigate("/console/tenant/group/create", {
                            state: {
                                tenant: tenant
                            }
                        });
                    }}/>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "end" }}>
                    <SearchFilter elements={groups} searchKey="groupName" filteredElements= {filteredGroups} setFilteredElements={setFilteredGroups} />
                </Grid>
                {
                    filteredGroups && filteredGroups.length > 0
                        ? filteredGroups.map((group, idx) => {
                            return (
                                <Grid item key={idx} xs={12} sm={4} md={4} lg={4}>
                                    <GroupCard group={group} tenant={tenant} {...props}/>
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
    ae_groups_container: {
        marginTop: "2rem"
    }
}