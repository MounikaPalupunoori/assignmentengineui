import { Chip, Container, Grid } from "@mui/material";
import ExamCard from "./ExamCard";
import React, { useEffect, useState } from "react";
import { doGetexams } from "./actions/actions";
import { useLocation, useNavigate } from "react-router-dom";

const Exams = (props) => {

  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const type = location.state.examType ? location.state.examType : "ALL";
    doGetexams(type, handleSuccess, handleFailure, handleLoading);
    // eslint-disable-next-line
  }, []);

  const handleSuccess = (exams) => {
    setExams(exams);
  };

  const handleFailure = (error) => {
    props.onError(error);
  };

  const handleLoading = (state) => {
    props.onLoading(state);
  };

  return (
    <Container maxWidth="lg" component={"main"} style={styles.ae_exams_container}>
      <Grid container spacing={2}>
        {
          props.hasAdminAccess
            ? <Grid item xs={12}>
              <Chip label="Create Exam" onClick={(event) => {
                event.preventDefault();
                navigate("/console/exam/create");
              }} />
            </Grid>
            : <React.Fragment />
        }
        {
          props.loading
            ? <React.Fragment></React.Fragment>
            : exams && exams.length > 0
              ? exams.map((exam, index) => {
                return (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                    <ExamCard exam={exam}
                      onDelete={(examId) => setExams(exams.filter(exam => (exam.id !== examId)))}
                      hasAdminAccess={props?.hasAdminAccess} />
                  </Grid>
                )
              })
              : <></>
        }
      </Grid>
    </Container>
  );
};

const styles = {
  ae_exams_container: {
    marginTop: "2rem"
  }
}

export default Exams;
