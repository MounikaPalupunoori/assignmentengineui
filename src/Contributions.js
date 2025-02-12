import { Card, CardContent, CardHeader, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { data } from "./data";


export default function Contributions(props) {

    const [contributions, setContributions] = useState([]);
    const [filteredContributions, setFilterContributions] = useState([]);
    const [filters, setFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({});

    useEffect(() => {
        setContributions(data);
        setFilterContributions(data);
        let languages = [];
        data.forEach((item) => {
            languages.push(item?.language);
        });
        setFilters(languages);
    }, []);

    const handleFilterSelection = (event, filter) => {
        event.preventDefault();
        // check if the current filter is already selected        
        if(selectedFilter === filter) {
            // do reset
            setSelectedFilter();
            setFilterContributions(contributions);                    
        } else {
            setFilterContributions(contributions.filter(contribution => contribution?.language.includes(filter)));
            setSelectedFilter(filter);                                
        }        
    };

    return (
        <Container maxWidth={"lg"} component={"main"} sx={{paddingTop: "5rem"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Stack direction={"row"} spacing={1}>
                        {
                            filters && filters.length > 0
                                ? filters.map((filter, idx) => {
                                    return (
                                        <Chip label={filter} key={idx} onClick={(event) => handleFilterSelection(event, filter)}
                                            color={(selectedFilter === filter) ? "primary" : "default"}                                            
                                        />
                                    )
                                })
                                : <></>
                        }
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                {
                    filteredContributions && filteredContributions.length > 0
                        ? filteredContributions.map((contribution, idx) => {
                            return (
                                <Card sx={{marginBottom: "1rem"}} key={idx}>
                                    <CardHeader title={contribution?.name} />
                                    <CardContent>
                                        <Typography variant="body2">{contribution?.language}</Typography>
                                    </CardContent>
                                </Card>
                            )
                        })
                        : <></>
                }
                </Grid>
            </Grid>
        </Container>
    )
}