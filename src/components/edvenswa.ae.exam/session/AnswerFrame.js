import {
  Card,
  CardContent,
  Grid
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { EXAM_QUESTION_CHECKBOX_TYPE, EXAM_QUESTION_RADIO_TYPE } from "../constants/constants";
import { AnwserRadioButtonGroup } from "./AnwserRadioButtonGroup";
import AnwserCheckboxGroup from "./AnwserCheckboxGroup";

AnswerFrame.propTypes = {
  questions: PropTypes.array.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired
};

export default function AnswerFrame(props) {

  const { questions, currentQuestionIndex } = props;
  const currentQuestion = questions[currentQuestionIndex];
  const questionType = questions[currentQuestionIndex].questionType;
  const options = questions[currentQuestionIndex].options;

  return (
    <Card style={{ marginTop: "0.5rem" }}>
      <CardContent>
        <Grid item>
          {
            (questionType === EXAM_QUESTION_RADIO_TYPE)
              ? <AnwserRadioButtonGroup options={options} questionId={currentQuestion.id}/>
              : (questionType === EXAM_QUESTION_CHECKBOX_TYPE)
                ? <AnwserCheckboxGroup options={options} questionId={currentQuestion.id}></AnwserCheckboxGroup>
                : <React.Fragment></React.Fragment>
          }
        </Grid>
      </CardContent>
    </Card>
  );
}
