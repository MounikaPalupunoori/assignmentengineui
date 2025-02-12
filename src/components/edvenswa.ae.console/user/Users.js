import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchFilter from "../../edvenswa.ae.common/search/SearchFilter";
import { doGetUsersByGroupId } from "../actions/action";
import UserCard from "./UserCard";

export default function TenantUsers(props) {

    const location = useLocation();

    const [users, setUsers] = useState([]);
    const [group, setGroup] = useState({});
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleLoading = (state) => {
        props.onLoading(state);
    };

    const handleSuccess = (data) => {
        setUsers(data);
        setFilteredUsers(data);
    };

    const handleFailure = (error) => {
        props.onError(error);
    };

    useEffect(() => {
        if (location && location.state) {
            const t = location.state.group;
            setGroup(t);
        }
        if (group && group?.id) {
            doGetUsersByGroupId(group?.id, handleSuccess, handleFailure, handleLoading);
        }
        // eslint-disable-next-line       
    }, [group]);

    return (
        <Container component={"main"} maxWidth={"lg"} style={styles.ae_users_container}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <SearchFilter elements={users} searchKey="username" filteredElements={filteredUsers} setFilteredElements={setFilteredUsers} />
                </Grid>
                {
                    filteredUsers && filteredUsers.length > 0
                        ? filteredUsers.map((user, idx) => {
                            return (
                                <Grid item key={idx} xs={12} sm={6} md={6} lg={6}>
                                    <UserCard user={user}/>
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
    ae_users_container: {
        marginTop: "2rem"
    }
}