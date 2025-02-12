import { Close, Search } from "@mui/icons-material";
import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function SearchFilter(props) {

    const { elements, searchKey, filteredElements, setFilteredElements } = props;
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const value = event.target.value;
        setValue(event.target.value);
        if (value) {
            const filteredItems = filteredElements.filter(element => element[searchKey].includes(value));
            setFilteredElements(filteredItems);
        } else {
            setFilteredElements(elements);
        }
    };

    return (
        <Container maxWidth={"xs"}>
            <TextField
                name="search"
                label="Search"
                size="small"
                value={value}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment>
                            <Close position="end" fontSize="small" sx={{ cursor: "pointer" }} onClick={() => {
                                setValue("");
                                setFilteredElements(elements);
                            }} />
                        </InputAdornment>
                    )
                }}
                onChange={handleChange}
            />
        </Container>
    )
}