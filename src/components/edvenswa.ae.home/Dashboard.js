import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_SECURE_USER_DETAILS_LS_LEY } from "../edvenswa.ae.auth/constants/constants";
import { getResources } from "./factory/ResourceFactory";

export default function Dashboard(props) {

    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem(AUTH_SECURE_USER_DETAILS_LS_LEY));

    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        if (user && user.token) {
            const roles = user?.roles;
            const resources = getResources(roles);
            setTiles(resources);                      
        }
        // eslint-disable-next-line
    }, []);

    const handleCardActionClick = (event, navigateTo, navigateState) => {
        event.preventDefault();
        navigate(navigateTo, {            
            state: navigateState
        });
    };

    return (
        <Grid container spacing={2}>
            {
                tiles && tiles.map((tile, index) => {
                    return (
                        <Grid item xs={12} md={6} key={index}>
                            <Card sx={{height: "100%"}}>
                                <CardActionArea onClick={(event) => {
                                    handleCardActionClick(event, tile?.navigateTo, tile?.navigateState);
                                }}>
                                    <CardMedia
                                        image={tile.imageUrl}
                                        component={"img"}
                                        title={tile.title}
                                        sx={{ objectFit: "contain", height: "100px", marginTop: "0.5rem" }}
                                    >
                                    </CardMedia>
                                    <CardContent sx={{ textAlign: "left" }}>
                                        <Typography gutterBottom variant="h6" component="h2">{tile.title}</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {tile?.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}