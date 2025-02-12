import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, Popover, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { doGetRoles, doPutUserRoles } from "../actions/action";

export default function RolePopover(props) {

    const { el, assignedRoles, handleClose, user } = props;
    const popOverOpen = Boolean(el);

    const [authorities, setAuthorities] = useState([]);
    const [existingAuthorities, setExistingAuthorities] = useState([]);

    useEffect(() => {
        doGetRoles(handleSuccess, handleFailure);
        // eslint-disable-next-line
    }, []);

    const handleSuccess = (data, type) => {
        if (type === "GET_ROLES") {
            setAuthorities(data);
            setExistingAuthorities(assignedRoles);
        }
        if (type === "UPDATE_ROLES") {
            // assign the updated roles
            user.roles = existingAuthorities;
            handleClose();
        }
    };

    const handleFailure = (err) => {
        console.log(err);
    }

    const hasChecked = (authority) => {
        const record = existingAuthorities.find(assignedRole => (assignedRole?.name === authority?.name));
        if (record) {
            return true;
        }
        return false;
    };

    const handleChange = (event) => {
        const selectedAuthority = event.target.value;
        // check the condition to checked or not
        const checked = event.target.checked;
        // if true, add the checked option to the list of
        // checked options
        let copyOfOptions = [];
        if (checked) {
            copyOfOptions = [...existingAuthorities, authorities.find(authority => (authority?.name === selectedAuthority))];
        } else {
            // if false, find the checked option in the list of checked option
            // and remove it.
            copyOfOptions = existingAuthorities.filter(authority => (authority?.name !== selectedAuthority));
        }
        setExistingAuthorities(copyOfOptions);
    };

    const handleApplyRoles = (event) => {
        const data = {
            id: user?.id,
            roles: existingAuthorities
        }
        doPutUserRoles(data, handleSuccess, handleFailure);
    };

    return (
        <Popover
            id={"ae-roles-popover"}
            open={popOverOpen}
            anchorEl={el}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Card>
                <CardHeader title={"Authorities"} sx={{ textAlign: "center" }} />
                <CardContent>
                    <FormControl>
                        <RadioGroup>
                            {
                                authorities && authorities.map((authority, index) => {
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            control={<Checkbox />}
                                            label={authority?.name}
                                            value={authority?.name}
                                            checked={hasChecked(authority)}
                                            onChange={handleChange}
                                        />
                                    )
                                })
                            }
                        </RadioGroup>
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={handleApplyRoles}>
                        Apply
                    </Button>
                </CardActions>
            </Card>
        </Popover>
    )
};