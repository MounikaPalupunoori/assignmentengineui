import { Container, Card, CardContent, TextField, Grid, Button, FormControl, MenuItem, Radio, FormControlLabel, RadioGroup, Typography, Stack, Chip, Badge, CardHeader } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    EXAM_TITLE_FIELD_ID, EXAM_COURSES_FIELD_ID, EXAM_LEVEL_FIELD_ID, EXAM_DURATION_FIELD_ID, EXAM_END_DATE_FIELD_ID, EXAM_IMAGE_FIELD_ID, EXAM_QUESTIONS_FIELD_ID, EXAM_TYPE_FIELD_ID
} from "../constants/constants";
import { isValidDate, isValidDuration, isValidTitle } from "../../edvenswa.ae.common/validation/Validation";
import QuestionsDialogBox from "./QuestionsDialogBox";
import { getExamFields } from "../forms/GetFields";
import { doGetCourses, doGetExamLevels, doGetExamTypes, doCreateExam } from "../actions/actions";
import { Delete, MailOutlined } from "@mui/icons-material";
import InvitationDialogBox from "./InvitationDialogBox";
import { EXAM_TYPE_ALL } from "../../edvenswa.ae.home/constants/constants";


export default function CreateExam(props) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const fields = [EXAM_TITLE_FIELD_ID, EXAM_COURSES_FIELD_ID, EXAM_LEVEL_FIELD_ID, EXAM_TYPE_FIELD_ID, EXAM_DURATION_FIELD_ID, EXAM_END_DATE_FIELD_ID, EXAM_IMAGE_FIELD_ID, EXAM_QUESTIONS_FIELD_ID];
    const formFields = getExamFields(fields);

    const [courses, setCourses] = useState([]);
    const [levels, setLevels] = useState([]);
    const [types, setTypes] = useState([]);

    const [questionsGenerateMode, setQuestionsGenerateMode] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [title, setTitle] = useState("");
    const [examType, setExamType] = useState("");
    const [duration, setDuration] = useState();
    const [endDate, setEndDate] = useState("");
    const [level, setLevel] = useState("");
    const [examImage, setExamImage] = useState("");
    const [invitations, setInvitations] = useState([]);
    const [invitationsDialogOpen, setInvitationsDialogOpen] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (courses.length === 0) {
            doGetCourses(handleSuccess, handleFailure);
        }
        if (levels.length === 0) {
            doGetExamLevels(handleSuccess, handleFailure);
        }
        if (types.length === 0) {
            doGetExamTypes(handleSuccess, handleFailure);
        }
        if (questionsGenerateMode === "Manual") {
            setDialogOpen(true);
        }
        // eslint-disable-next-line
    }, [questionsGenerateMode]);

    const handleSuccess = (data, type) => {
        switch (type) {
            case "GET_COURSES": {
                setCourses(data);
                break;
            }
            case "GET_LEVELS": {
                setLevels(data);
                break;
            }
            case "GET_TYPES": {
                setTypes(data);
                break;
            }
            default: {
                navigate("/console/exams", {
                    state: {
                        examType: EXAM_TYPE_ALL
                    }
                });
            }
        }
    };

    const handleFailure = (error) => {
        props.onError(error);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (questionsGenerateMode === "Manual" && selectedQuestions.length === 0) {
            handleFailure({
                message: "You have chosen manual mode to generate questions but no questions selected."
            });
            return;
        }
        if (invitations.length === 0) {
            handleFailure({
                message: "No invitations selected."
            });
            return;
        }
        const data = {
            [EXAM_TITLE_FIELD_ID]: title,
            [EXAM_LEVEL_FIELD_ID]: level,
            [EXAM_TYPE_FIELD_ID]: examType,
            [EXAM_DURATION_FIELD_ID]: duration,
            [EXAM_END_DATE_FIELD_ID]: endDate,
            [EXAM_COURSES_FIELD_ID]: selectedCourses,
            [EXAM_QUESTIONS_FIELD_ID]: selectedQuestions,
            [EXAM_IMAGE_FIELD_ID]: examImage,
            invitations: invitations,
            expired: false
        };
        doCreateExam(data, handleSuccess, handleFailure);
    };

    const handleChange = (field_name, value) => {
        switch (field_name) {
            case EXAM_TITLE_FIELD_ID: {
                if (!isValidTitle(value)) {
                    setErrors({ [field_name]: { message: 'Title should be atleast 4 characters' } });
                } else {
                    setErrors(delete [field_name]);
                    setTitle(value);
                }
                break;
            }
            case EXAM_COURSES_FIELD_ID: {
                const isCourseExists = selectedCourses.find(course => (course.courseName === value));
                if (isCourseExists && isCourseExists.id) {
                    return;
                }
                setSelectedCourses([...selectedCourses, courses.find(course => (course.courseName === value))]);
                break;
            }
            case EXAM_LEVEL_FIELD_ID: {
                setLevel(value);
                break;
            }
            case EXAM_TYPE_FIELD_ID: {
                setExamType(value);
                break;
            }
            case EXAM_DURATION_FIELD_ID: {
                if (!isValidDuration(value)) {
                    setErrors({ [field_name]: { message: 'Duration must be greater than 10' } });
                } else {
                    setErrors(delete [field_name]);
                    setDuration(value);
                }
                break;
            }
            case EXAM_END_DATE_FIELD_ID: {
                if (!isValidDate(value)) {
                    setErrors({ [field_name]: { message: 'Date should not be past date' } });
                } else {
                    setErrors(delete [field_name]);
                    setEndDate(value);
                }
                break;
            }
            case EXAM_IMAGE_FIELD_ID: {
                setExamImage(value);
                break;
            }
            default: {
                console.error("Invalid field name: ", field_name);
            }
        }
    };

    const onSelect = (questions) => {
        if (questions.length > 0) {
            setSelectedQuestions(questions);
        }
    };

    return (
        <Container maxWidth={"md"} component={"main"} sx={{ marginTop: "2rem" }}>
            <Card>
                <CardHeader
                    title={
                        <Badge badgeContent={invitations.length} color="secondary" showZero>
                            <MailOutlined color="action" onClick={() => setInvitationsDialogOpen(!invitationsDialogOpen)}></MailOutlined>
                        </Badge>
                    }
                    sx={{ textAlign: "end", marginRight: "1rem", cursor: "pointer" }}
                >
                </CardHeader>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                formFields.map((field, key) => {
                                    return (
                                        <Grid item xs={12} key={key}>
                                            {
                                                field.type !== "radio"
                                                    ? <TextField {...field} fullWidth label={t(field.label)}
                                                        onChange={(event) => handleChange(field.name, event.target.value)} defaultValue="">
                                                        {
                                                            field.select
                                                                && field.id === EXAM_COURSES_FIELD_ID
                                                                ? courses.map((course, idx1) => {
                                                                    return (
                                                                        <MenuItem value={course?.courseName} key={idx1}>{course?.courseName}</MenuItem>
                                                                    )
                                                                })
                                                                : field.id === EXAM_LEVEL_FIELD_ID
                                                                    ? levels.map((level, idx2) => {
                                                                        return (
                                                                            <MenuItem value={level} key={idx2}>{level}</MenuItem>
                                                                        )
                                                                    })
                                                                    : field.id === EXAM_TYPE_FIELD_ID
                                                                        ? types.map((type, idx3) => {
                                                                            return (
                                                                                <MenuItem value={type} key={idx3}>{type}</MenuItem>
                                                                            )
                                                                        })
                                                                        : <React.Fragment></React.Fragment>
                                                        }
                                                    </TextField>
                                                    : <FormControl>
                                                        <Typography variant="body1">{t(field.label)}:</Typography>
                                                        <RadioGroup name={field.name} row>
                                                            {field.options.map((option, key) => (
                                                                <FormControlLabel
                                                                    key={key}
                                                                    value={option}
                                                                    control={<Radio />}
                                                                    label={option}
                                                                    onClick={(e) => setQuestionsGenerateMode(e.target.value)}
                                                                />
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                            }
                                            {
                                                (field.id === EXAM_COURSES_FIELD_ID && selectedCourses && selectedCourses.length > 0)
                                                    ? <Stack direction={"row"} spacing={1} mt={1}>
                                                        {
                                                            selectedCourses.map((selectedCourse, idx) => {
                                                                return (
                                                                    <Chip
                                                                        key={idx}
                                                                        label={selectedCourse?.courseName}
                                                                        size="small"
                                                                        sx={{ backgroundColor: "#2c6b79 !important" }}
                                                                        deleteIcon={<Delete sx={{ color: "#d19c9c !important" }}></Delete>}
                                                                        onDelete={() => setSelectedCourses(selectedCourses.filter(course => (course.id !== selectedCourse.id)))}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </Stack>
                                                    : <></>
                                            }
                                        </Grid>
                                    )
                                })
                            }
                            <Grid item xs={12}>
                                <Stack direction={"row-reverse"} spacing={1}>
                                    <Button type="submit" variant="contained" size="small">Create Exam</Button>
                                    <Button variant="contained" size="small"
                                        onClick={() => {
                                            navigate("/console/exams", {
                                                state: {
                                                    examType: EXAM_TYPE_ALL
                                                }
                                            });
                                        }}
                                    >Cancel</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                        {
                            dialogOpen && level && courses.length > 0
                                ? <QuestionsDialogBox
                                    open={dialogOpen}
                                    courses={selectedCourses}
                                    level={level}
                                    onSelect={onSelect}
                                    onClose={() => setDialogOpen(false)}
                                />
                                : <React.Fragment />
                        }
                        {
                            invitationsDialogOpen
                                ? <InvitationDialogBox
                                    invitations={invitations}
                                    open={invitationsDialogOpen}
                                    onClose={() => setInvitationsDialogOpen(!invitationsDialogOpen)}
                                    onSelect={(emails) => setInvitations(emails)}
                                />
                                : <></>
                        }
                    </Box>
                </CardContent>
            </Card>
        </Container >
    )
};