import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import Timer from "./Timer";
import PropTypes from 'prop-types';

ExamHeader.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
  onTimeout: PropTypes.func.isRequired
}

export default function ExamHeader(props) {

  const { title, duration, level, onTimeout } = props;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography style={{ fontWeight: 500 }}>{title}</Typography>
            <Typography style={{ fontWeight: 500 }}>For {level}</Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "end" }}>
            <Typography style={{ fontWeight: 500 }}>Time Left</Typography>
            <Timer minutes={duration} onTimeout={onTimeout}></Timer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}