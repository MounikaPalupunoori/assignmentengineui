import { Container, Grid} from "@mui/material";
import PropTypes from 'prop-types';
import Dashboard from "./Dashboard";
import Greet from "./Greet";

Home.propTypes = {
    user: PropTypes.object.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
};

export default function Home(props) {

    return (
        <Container component={"main"} maxWidth="md" style={styles.truassessor_home_container}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Greet user={props.user} />
                </Grid>
                <Grid item xs={12}>
                    <Dashboard />
                </Grid>
            </Grid>
        </Container>
    )
}

const styles = {
    truassessor_home_container: {
        textAlign: "center"
    }
}