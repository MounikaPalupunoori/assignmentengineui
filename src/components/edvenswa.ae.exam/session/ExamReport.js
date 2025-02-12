import { Button, Card, CardActions, CardContent, CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { doGenerateReport } from "../actions/actions";

export default function ExamReport(props) {

  const { sessionId } = props;
  const [report, setReport] = useState({});

  useEffect(() => {
    if (sessionId) {
      doGenerateReport({ sessionId: sessionId }, handleSuccess, handleFailure, handleLoading);
    }
    // eslint-disable-next-line
  }, [location]);

  const handleSuccess = (result) => {
    setReport(result);
  };

  const handleFailure = (err) => {
    props.onError(err);
  };

  const handleLoading = (state) => {
    props.onLoading(state, true);
  };

  const handleExitSession = () => {
    props.onExitSession();
  };

  return (
    <Container maxWidth={"md"} component={"main"}>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            {
              !props.loading
                ? <React.Fragment>
                  <Grid item xs={6}>
                    <Typography align="right">Total Questions: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="left">{props?.totalQuestions}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">Correct Anwsers: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="left">{report?.correctAnswersCount}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right" sx={{ fontWeight: 500 }}>Percentage:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="left" sx={{ fontWeight: 500 }}>{report?.percentage}%</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right" sx={{ fontWeight: 500 }}>Status:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {
                      report && report?.percentage > 60
                        ? <Typography align="left" sx={{ fontWeight: 500, color: "darkgreen" }}>PASSED</Typography>
                        : <Typography align="left" sx={{ fontWeight: 500, color: "red" }}>FAILED</Typography>
                    }
                  </Grid>
                </React.Fragment>
                : <React.Fragment>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <CircularProgress size={70}></CircularProgress>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Typography component={"h6"} variant={"h6"}>
                      Generating Report...
                    </Typography>
                  </Grid>
                </React.Fragment>
            }
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "end" }}>
          <Button variant="contained" size="medium"
            disabled={props.loading} type="button" onClick={handleExitSession}
          >EXIT SESSION</Button>
        </CardActions>
      </Card>
    </Container>
  );
};
