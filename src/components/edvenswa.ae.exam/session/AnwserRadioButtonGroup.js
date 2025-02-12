import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../interceptors/AxiosInterceptor";

export function AnwserRadioButtonGroup(props) {

  const { options, questionId } = props;

  const params = useParams();
  const [checked, setChecked] = useState({});

  useEffect(() => {
    // get previous state
    axiosInstance.get(`/exam/session/state?sessionId=${params.sessionId}`)
      .then(res => {
        for (const [key, value] of Object.entries(res.data.state)) {
          if (key === questionId) {
            setChecked({
              [questionId]: value[0]
            });
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
    const data = {
      sessionId: params.sessionId,
      questionId: questionId,
      selectedOptions: [event.target.value]
    };
    axiosInstance.put("/exam/session/state", data);
    setChecked({
      [questionId]: event.target.value
    });
  };

  return (
    <FormControl>
      <RadioGroup>
        {
          options && options.map((option, index) => {
            return (
              <FormControlLabel
                key={index}
                control={<Radio />}
                label={option}
                value={option}
                checked={checked[questionId] === option}
                onChange={handleChange}
              />
            )
          })
        }
      </RadioGroup>
    </FormControl>
  )
};