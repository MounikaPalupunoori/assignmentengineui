import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

QuestionFrame.propTypes = {
  questions: PropTypes.array.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
};

export default function QuestionFrame(props) {

  const { questions, currentQuestionIndex } = props;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Question {currentQuestionIndex + 1} of {questions.length}
        </Typography>
        <Typography sx={{ fontWeight: 400 }}>{questions[currentQuestionIndex].question}</Typography>
      </CardContent>
    </Card>
  );
}
