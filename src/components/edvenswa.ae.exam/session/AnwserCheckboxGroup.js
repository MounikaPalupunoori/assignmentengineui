import { Checkbox, FormControl, FormControlLabel, RadioGroup, } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../interceptors/AxiosInterceptor";

export default function AnwserCheckboxGroup(props) {

    const { options, questionId } = props;
    const params = useParams();
    const [checkedOptions, setCheckedOptions] = useState([]);

    useEffect(() => {
        // get previous state
        axiosInstance.get(`/exam/session/state?sessionId=${params.sessionId}`)
            .then(res => {
                for (const [key, value] of Object.entries(res.data.state)) {
                    if (key === questionId) {
                        setCheckedOptions(value);
                        break;
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
            // eslint-disable-next-line
    }, [questionId]);

    const handleChange = (event) => {
        const checkedOption = event.target.value;
        if (options.indexOf(checkedOption) !== -1) { // Strict validation to check the selected option is in range of options
            // check the condition to checked or not
            const checked = event.target.checked;
            // if true, add the checked option to the list of
            // checked options
            let copyOfOptions = []; 
            if(checked) {
                copyOfOptions = [...checkedOptions, checkedOption];
            } else {
                // if false, find the checked option in the list of checked option
                // and remove it.
                copyOfOptions = checkedOptions.filter(option => (option !== checkedOption));
            }
            const data = {
                sessionId: params.sessionId,
                questionId: questionId,
                selectedOptions: copyOfOptions,
            };
            axiosInstance.put("/exam/session/state", data)
                .then(res => {
                    for (const [key, value] of Object.entries(res.data.state)) {
                        if (key === questionId) {
                            setCheckedOptions(value);
                            break;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <FormControl>
            <RadioGroup>
                {
                    options && options.map((option, index) => {
                        return (
                            <FormControlLabel
                                key={index}
                                control={<Checkbox />}
                                label={option}
                                value={option}
                                checked={checkedOptions.indexOf(option) !== -1}
                                onChange={handleChange}
                            />
                        )
                    })
                }
            </RadioGroup>
        </FormControl>
    )

}