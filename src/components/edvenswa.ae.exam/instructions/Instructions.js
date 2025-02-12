import { Button, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import ExamDetailsCard from './ExamDetailsCard';
import GeneralInformationCard from './GeneralInformationCard';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { doPostExamStateSession, doPostUserSession } from '../actions/actions';

function Instructions(props) {

  const navigate = useNavigate();
  const location = useLocation();

  const [exam, setExam] = useState({});
  const [examSessionId, setExamSessionId] = useState(null);
  const [examSessionStateId, setExamSessionStateId] = useState(null);

  useEffect(() => {
    if (location && location.state && location.state.exam) {
      setExam(location.state.exam);
    }
    if (examSessionId) {
      doPostExamStateSession({sessionId: examSessionId, totalCount: exam?.questions?.length},
        handleSessionStateSuccess, handleSessionStateFailure, handleLoading);
      if (examSessionStateId) {
        navigate(`/exam/session/${examSessionId}`, {
          state: { exam: exam }
        });
      }
    }
    // eslint-disable-next-line
  }, [location, examSessionId, examSessionStateId]);

  const handleClick = (event) => {
    event.preventDefault();
    // create exam user session
    doPostUserSession({ examId: exam.id }, handleSuccess, handleFailure, handleLoading);
  };

  const { t } = useTranslation();

  const handleSuccess = (examSessionId) => {
    setExamSessionId(examSessionId);
  };

  const handleFailure = (err) => {
    props.onError(err);
  };

  const handleSessionStateSuccess = (examSessionStateId) => {
    setExamSessionStateId(examSessionStateId);
  };

  const handleSessionStateFailure = (err) => {
    props.onError(err);
  };

  const handleLoading = (state) => {
    props.onLoading(state);
  };

  return (
    <Container maxWidth="md" component={"main"} sx={{ marginTop: "2rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <GeneralInformationCard />
        </Grid>
        <Grid item xs={12}>
          <ExamDetailsCard exam={exam} />
        </Grid>
        <Grid item xs={12} align='center'>
          <Button onClick={handleClick} variant='contained'
            disabled={props.loading}>
            {t('instructions.START_BUTTON')}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Instructions;