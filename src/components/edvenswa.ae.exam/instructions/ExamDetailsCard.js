import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

ExamDetailsCard.propTypes = {
  exam: PropTypes.object.isRequired
}

export default function ExamDetailsCard(props){

  const { t } = useTranslation();
  const {exam} = props;

  return (
    <Card>
      <CardHeader title={t('instructions.EXAM_DETAILS_TITTLE')} />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography align='right' sx={{ fontWeight: 500 }} >{t('instructions.COURSE_NAME')} : </Typography>            
          </Grid>
          <Grid item xs={6}>
            <Typography align='left' sx={{color: "#1e841e", fontWeight: "bold"}}>{exam?.title}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography align='right' sx={{ fontWeight: 500 }}>{t('instructions.EXAM_DURATION')} : </Typography>            
          </Grid>
          <Grid item xs={6}>
            <Typography align='left' sx={{color: "#6c1313", fontWeight: "bold"}}>{exam?.duration}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography align='right' sx={{ fontWeight: 500 }} >{t('instructions.EXAM_LEVEL')} : </Typography>            
          </Grid>
          <Grid item xs={6}>
            <Typography align='left' sx={{color: "#466fb9", fontWeight: "bold"}}>{exam?.level}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}