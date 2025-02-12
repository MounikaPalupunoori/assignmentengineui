import { Button, Card, CardActions, Grid } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

ActionsFrame.propTypes = {
  questions: PropTypes.array.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default function ActionsFrame(props) {
  const { questions, currentQuestionIndex } = props;
  return (
    <Card>
      <CardActions>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {
              currentQuestionIndex !== 0
                ?
                <Button
                  variant="contained"
                  onClick={props.onPrev}
                  startIcon={<ArrowBack />}
                >
                  Prev
                </Button>
                : <React.Fragment></React.Fragment>
            }
          </Grid>
          <Grid item xs={6} style={{ textAlign: "end" }}>
            <Button
              variant="contained"
              onClick={props.onNext}
              endIcon={(currentQuestionIndex + 1 !== questions.length) ? <ArrowForward /> : <></>}
            >
              {(currentQuestionIndex + 1 === questions.length) ? "Finish" : "Next"}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
