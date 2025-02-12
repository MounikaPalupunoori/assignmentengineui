import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Alert, Avatar, Box, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Close, SearchRounded } from '@mui/icons-material';
import { doSearch } from '../actions/action';

export default function SearchPicker(props) {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm && searchTerm.length > 1) {
            const data = {
                searchType: "USER",
                searchTerm: searchTerm
            };
            doSearch(data, handleSuccess, handleFailure);
        }
        // eslint-disable-next-line 
    }, [searchTerm]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    const handleSelect = (element) => {
        props.onSelect(element);
        setSearchTerm(element?.username);
    };

    const handleClear = () => {
        props.onClear();
    };

    const handleSuccess = (data) => {
        setData(data);
    };

    const handleFailure = (err) => {
        props.onError(err);
    };

    return (
        <Box className="ae-console-userpicker-box">
            <TextField
                label="Search by email"
                fullWidth
                onChange={handleChange}
                value={searchTerm}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRounded fontSize='medium' sx={{ color: "#1C243C" }} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Close fontSize='small' sx={{ color: "#1C243C" }}
                                onClick={(e) => {
                                    setSearchTerm("");
                                    setData([]);
                                    handleClear();
                                }}
                            />
                        </InputAdornment>
                    )
                }}
            />
            {
                data && data.length > 0
                    ? <List component="div" disablePadding
                        style={{ backgroundColor: "aliceblue", zIndex: 999, maxHeight: "200px", overflow: "auto" }}>
                        {data.map((element, key) => {
                            return (
                                <ListItemButton key={key} onClick={() => {
                                    handleSelect(element);
                                    setSearchTerm("");
                                    setData([]);
                                }} >
                                    <ListItemIcon>
                                        <Avatar alt={element?.username} color="primary" src={element?.userImage} />
                                    </ListItemIcon>
                                    <ListItemText primary={element?.username} />
                                </ListItemButton>
                            )
                        })}
                    </List>
                    : <></>
            }
            {
                searchTerm.length > 0 && data.length === 0 &&
                <Alert severity='warning'>No records found for given email {searchTerm}</Alert>
            }
        </Box>
    );
};