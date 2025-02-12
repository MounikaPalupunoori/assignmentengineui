import { AccessTime, Assessment, Event, Image, Layers, Note, Notes } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { EXAM_COURSES_FIELD_ID, EXAM_DURATION_FIELD_ID, EXAM_END_DATE_FIELD_ID, EXAM_LEVEL_FIELD_ID, EXAM_TITLE_FIELD_ID, EXAM_IMAGE_FIELD_ID, EXAM_QUESTIONS_FIELD_ID, EXAM_TYPE_FIELD_ID }
    from "../constants/constants";

export const examFields = {
    [EXAM_TITLE_FIELD_ID]: {
        id: EXAM_TITLE_FIELD_ID,
        name: EXAM_TITLE_FIELD_ID,
        type: "text",
        label: "exam.TITLE_FIELD_TEXT",
        placeholder: "Enter title",
        variant: "outlined",
        autoFocus: true,
        required: true,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Note fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [EXAM_COURSES_FIELD_ID]: {
        id: EXAM_COURSES_FIELD_ID,
        name: EXAM_COURSES_FIELD_ID,        
        select: true,
        label: 'exam.COURSES_FIELD_TEXT',
        variant: "outlined",
        required: true,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Layers fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [EXAM_TYPE_FIELD_ID]: {
        id: EXAM_TYPE_FIELD_ID,
        name: EXAM_TYPE_FIELD_ID,
        select: true,        
        label: 'exam.EXAM_TYPE_FIELD_TEXT',
        variant: "outlined",       
        required: true,
        multiple: false,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Notes fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [EXAM_LEVEL_FIELD_ID]: {
        id: EXAM_LEVEL_FIELD_ID,
        name: EXAM_LEVEL_FIELD_ID,
        select: true,
        label: 'exam.LEVEL_FIELD_TEXT',
        variant: "outlined",
        required: true,
        multiple: false,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Assessment fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [EXAM_DURATION_FIELD_ID]: {
        id: EXAM_DURATION_FIELD_ID,
        name: EXAM_DURATION_FIELD_ID,
        type: "number",
        label: 'exam.DURATION_FIELD_TEXT',
        variant: "outlined",
        required: true,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <AccessTime fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [EXAM_END_DATE_FIELD_ID]: {
        id: EXAM_END_DATE_FIELD_ID,
        name: EXAM_END_DATE_FIELD_ID,
        type: "date",
        label: 'exam.END_DATE_FIELD_TEXT',
        variant: "outlined",
        required: true,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Event fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [EXAM_IMAGE_FIELD_ID]: {
        id: EXAM_IMAGE_FIELD_ID,
        name: EXAM_IMAGE_FIELD_ID,
        type: "text",
        label: 'exam.IMAGE_FIELD_TEXT',
        variant: "outlined",
        required: false,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Image fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [EXAM_QUESTIONS_FIELD_ID]: {
        id: EXAM_QUESTIONS_FIELD_ID,
        name: EXAM_QUESTIONS_FIELD_ID,
        type: "radio",
        label: 'exam.QUESTIONS_FIELD_TEXT',
        variant: "outlined",
        options: ["Random", "Manual"],
        required: true,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Notes fontSize="small" />
                </InputAdornment>
            )
        }
    },
}