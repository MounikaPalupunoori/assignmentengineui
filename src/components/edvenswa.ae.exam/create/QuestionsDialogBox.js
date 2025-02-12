import { Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SearchFilter from "../../edvenswa.ae.common/search/SearchFilter";
import { doGetQuestionsByCoursesAndLevel } from "../actions/actions";

export default function QuestionsDialogBox(props) {

    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [level, setLevel] = useState("");
    const [selectedFilter, setSelectedFilter] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCourses(props?.courses);
        setLevel(props?.level);
        if (level && courses.length > 0) {
            const data = {
                courses: courses,
                level: level
            };
            doGetQuestionsByCoursesAndLevel(data, handleSuccess, handleFailure, handleLoading);
        }
        // eslint-disable-next-line
    }, [level, courses]);

    const handleSuccess = (data) => {
        setQuestions(data);
        setFilteredQuestions(data);
    };

    const handleFailure = (err) => {
        console.log(err);
    };

    const handleLoading = (state) => {
        setLoading(state);
    };

    const handleFilterSelection = (event, course) => {
        event.preventDefault();
        // check if the current filter is already selected        
        if (selectedFilter && selectedFilter.id === course.id) {
            // do reset
            setSelectedFilter();
            setFilteredQuestions(questions);
        } else {
            setFilteredQuestions(questions.filter(question => (question.course.id === course.id)));
            setSelectedFilter(course);
        }
    };

    const handleSelect = (event, question) => {
        if (event.target.checked) {
            setSelectedQuestions([...selectedQuestions, question]);
        } else {
            setSelectedQuestions(selectedQuestions.filter(selectedQuestion => (selectedQuestion.id !== question.id)));
        }
    };

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle sx={{ borderBottom: loading ? "none" : "2px solid lightgrey" }}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Stack direction={"row"} spacing={1}>
                            {
                                courses && courses.length > 0
                                    ? courses.map((course, idx) => {
                                        return (
                                            <Chip label={course?.courseName} key={idx} onClick={(event) => handleFilterSelection(event, course)}
                                                color={(selectedFilter === course) ? "primary" : "default"} sx={{}} />
                                        )
                                    })
                                    : <></>
                            }
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <SearchFilter elements={questions} searchKey="question" filteredElements={filteredQuestions} setFilteredElements={setFilteredQuestions} />
                    </Grid>
                </Grid>
            </DialogTitle>
            {
                loading ? <LinearProgress /> : <></>
            }
            <DialogContent sx={{ marginTop: "1rem" }}>
                <List>
                    {
                        filteredQuestions && filteredQuestions.length > 0
                            ? filteredQuestions.map((question, idx) => {
                                return (
                                    <ListItem key={idx}>
                                        <ListItemIcon>
                                            <Checkbox
                                                size="small"
                                                checked={selectedQuestions.includes(question)}
                                                onChange={(event) => handleSelect(event, question)}
                                            />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography variant="body1" component={"h6"}>{question?.question}</Typography>
                                        </ListItemText>
                                    </ListItem>
                                )
                            })
                            : !loading && <Typography variant="body2" sx={{ textAlign: "center" }}>No records found</Typography>
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                        props.onSelect(selectedQuestions);
                        props.onClose();
                    }}
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    )
}