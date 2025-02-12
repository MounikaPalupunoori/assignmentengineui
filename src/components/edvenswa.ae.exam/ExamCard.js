import { Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Delete, Edit } from "@mui/icons-material";
import { doDeleteExams } from "./actions/actions";
import DefaultExamImage from '../../assets/ae_exam.png';

ExamCard.propTypes = {
  exam: PropTypes.object.isRequired
};

export default function ExamCard(props) {

  const { exam } = props;
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    if(props.hasAdminAccess) {
      return;
    }
    navigate('/exam/instructions', {
      state: { exam: exam }
    });
  };

  const handleDeleteExam = (examId) => {
    doDeleteExams(examId, handleSuccess, handleFailure);
  };

  const handleSuccess = (examId) => {
    props.onDelete(examId);
  };

  const handleFailure = (error) => {
    props.onError(error);
  };

  return (
    <Card sx={{ cursor: "pointer" }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={9} onClick={handleClick}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h6" component="h4">{exam?.title}</Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "start" }}>
                <Typography variant="body2" color="textSecondary" component="p">FOR {exam?.level}</Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "start" }}>
                <Typography variant="body2" color="textSecondary" component="p">{exam?.examType} EXAM</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} sx={{ alignSelf: "center" }}>
            <CardMedia
              component={'img'}
              alt={exam?.title}
              image={exam?.examImage ? exam.examImage : DefaultExamImage}
              sx={{ objectFit: "contain", height: "100px" }}
            />
          </Grid>
          <Grid item xs={12}>
            {
              props?.hasAdminAccess
                ? <Stack direction={"row"} spacing={1}>
                  <Edit fontSize="small"></Edit>
                  <Delete onClick={() => handleDeleteExam(exam?.id)} fontSize="small" sx={{ color: "#911919" }} />
                </Stack>
                : <></>
            }
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}