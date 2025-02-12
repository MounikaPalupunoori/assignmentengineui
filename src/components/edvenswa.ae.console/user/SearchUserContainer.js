import { Card, CardContent, Container, Grid } from "@mui/material";
import { useState } from "react";
import SearchPicker from "../../edvenswa.ae.common/search/SearchPicker";
import UserCard from "./UserCard";

export default function SearchUserContainer(props) {

    const [user, setUser] = useState({});

    const handleSelect = (user) => {
        if(user) {
            setUser(user);
        }
    };

    const handleClear = () => {
        setUser({});
    }

    return (
        <Container maxWidth={"lg"} component="main" sx={{ marginTop: "2rem" }}>
            <Card>                
                <CardContent sx={{marginTop: "1rem"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ alignSelf: "center" }}>
                            <SearchPicker onSelect={handleSelect} onClear={handleClear} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            {
                                user && user.id
                                    ? <UserCard user={user} />
                                    : <></>
                            }                            
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}